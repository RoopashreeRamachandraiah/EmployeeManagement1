package com.gilad.employee_management.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gilad.employee_management.exception.ResourceNotFoundException;
import com.gilad.employee_management.model.Employee;
import com.gilad.employee_management.model.UserAuthentication;
import com.gilad.employee_management.repository.EmployeeRepository;
import com.gilad.employee_management.repository.UserSecurityRepository;

@CrossOrigin
@RestController
@RequestMapping("/api/v1/")
public class EmployeeController {

	@Autowired
	private EmployeeRepository employeeRepository;

	@Autowired
	private UserSecurityRepository securityRepository;

	@GetMapping("/getAllEmployees")
	public List<Employee> getAllEmployees() {
		return employeeRepository.findAll();
	}

	@GetMapping("/getEmployee/{empId}")
	public Optional<Employee> getAllEmployees(@PathVariable Long empId) {
		return employeeRepository.findById(empId);
	}

	@PostMapping("/addEmployee")
	public ResponseEntity<@Valid Employee> createEmployee(@Valid @RequestBody Employee employee) {
		return ResponseEntity.ok(employeeRepository.save(employeeRepository.save(employee)));
	}

	@GetMapping("/userAuthentication/{emailId}")
	public Optional<UserAuthentication> getEmployeePassword(@PathVariable String emailId) {
		return securityRepository.findById(emailId);
	}

	@PutMapping("/updateEmployee/{id}")
	public ResponseEntity<Employee> updateEmployee(@PathVariable Long id,
			@Valid @RequestBody Employee employeeDetails) {
		Employee employee = employeeRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Employee with the id - " + id + " not exist"));
		employee.setFirstName(employeeDetails.getFirstName());
		employee.setLastName(employeeDetails.getLastName());
		employee.setEmail(employeeDetails.getEmail());
		return ResponseEntity.ok(employeeRepository.save(employee));
	}

	@DeleteMapping("/deleteEmployee/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id) {
		Employee employee = employeeRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Employee with the id - " + id + " not exist"));
		if (employee == null)
			throw new ResourceNotFoundException("id-" + id);
		employeeRepository.delete(employee);
		Map<String, Boolean> res = new HashMap<>();
		res.put("delete", Boolean.TRUE);
		return ResponseEntity.ok(res);
	}
}
