package com.gilad.employee_management;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Arrays;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.gilad.employee_management.model.Address;
import com.gilad.employee_management.model.Employee;
import com.gilad.employee_management.model.UserAuthentication;
import com.gilad.employee_management.repository.EmployeeRepository;
import com.gilad.employee_management.repository.UserSecurityRepository;

@SpringBootTest
@AutoConfigureMockMvc
class EmployeeManagementApplicationTests {
	@Autowired
	MockMvc mvc;

	@MockBean
	EmployeeRepository employeeRepository;
	@MockBean
	UserSecurityRepository userSecurityRepository;

	@Test
	void test_getAllEmployees() throws Exception {
		Employee employee = returnEmployeeList();
		Mockito.when(employeeRepository.findAll()).thenReturn(Arrays.asList(employee));
		mvc.perform(get("/api/v1/getAllEmployees")).andExpect(status().isOk())
				.andExpect(jsonPath("$.[0].firstName").value("abc"))
				.andExpect(jsonPath("$.[0].email").value("abc@something.com"))
				.andExpect(jsonPath("$.[0].phone").value("123456789"))
				.andExpect(jsonPath("$.[0].address.addressLine1").value("Goldsmith ave"))
				.andExpect(jsonPath("$.[0].address.postCode").value("E12 6QD"));

	}

	@Test
	void test_getEmployeeByEmail() throws Exception {
		Employee employee = returnEmployeeList();
		Mockito.when(employeeRepository.findByEmail("abc@something.com")).thenReturn(Optional.of(employee));
		mvc.perform(get("/api/v1/getEmployee/{email}", "abc@something.com")).andExpect(status().isOk())
				.andExpect(jsonPath("$.firstName").value("abc"))
				.andExpect(jsonPath("$.email").value("abc@something.com"))
				.andExpect(jsonPath("$.phone").value("123456789"))
				.andExpect(jsonPath("$.address.addressLine1").value("Goldsmith ave"))
				.andExpect(jsonPath("$.address.postCode").value("E12 6QD"));

	}

	@Test
	void test_getEmployeePassword() throws Exception {
		Mockito.when(userSecurityRepository.findById("abc@something.com")).thenReturn(Optional.of(returnAuth()));
		mvc.perform(get("/api/v1/userAuthentication/{emailId}", "abc@something.com")).andExpect(status().isOk())
				.andExpect(jsonPath("$.email").value("abc@something.com"))
				.andExpect(jsonPath("$.password").value("pwd")).andExpect(jsonPath("$.role").value("admin"));

	}

	@Test
	void test_createEmployee() throws Exception {
		Employee employee = returnEmployeeList();

		Mockito.when(employeeRepository.save(employee)).thenReturn(employee);
		mvc.perform(post("/api/v1/addEmployee").contentType(MediaType.APPLICATION_JSON)
				.content(new ObjectMapper().writeValueAsString(employee))).andExpect(status().isOk());

	}

	@Test
	void test_updateEmployee() throws Exception {
		Employee employee = returnEmployeeList();
		Mockito.when(employeeRepository.findByEmail("abc@something.com")).thenReturn(Optional.of(employee));
		Mockito.when(employeeRepository.save(employee)).thenReturn(employee);
		mvc.perform(post("/api/v1/updateEmployee/{id}", "abc@something.com").contentType(MediaType.APPLICATION_JSON)
				.content(new ObjectMapper().writeValueAsString(employee))).andExpect(status().isOk());

	}

	@Test
	void test_deleteEmployee() throws Exception {
		Employee employee = returnEmployeeList();
		Mockito.when(employeeRepository.findById((long) 1)).thenReturn(Optional.of(employee));
		mvc.perform(delete("/api/v1/deleteEmployee/{id}", (long) 1)).andExpect(status().isOk());

	}

	private Employee returnEmployeeList() {
		Employee employee = new Employee();
		employee.setFirstName("abc");
		employee.setLastName("xyz");
		employee.setEmail("abc@something.com");
		employee.setPhone("123456789");
		Address address = new Address();
		address.setAddressLine1("Goldsmith ave");
		address.setPostCode("E12 6QD");
		employee.setAddress(address);
		return employee;
	}

	private UserAuthentication returnAuth() {
		UserAuthentication userAuthentication = new UserAuthentication();
		userAuthentication.setEmail("abc@something.com");
		userAuthentication.setPassword("pwd");
		userAuthentication.setRole("admin");
		return userAuthentication;
	}
}
