import axios from 'axios'

const EMPLOYEE_API_BASE_URL = 'http://localhost:8080/api/v1/';

class EmployeeService {

    getEmployees() {
        console.log('inside getEmployees');
        return axios.get(EMPLOYEE_API_BASE_URL.concat("getAllEmployees"));
    }

    getEmployeeAuth(emailId) {
        return axios.get(EMPLOYEE_API_BASE_URL.concat(`userAuthentication/${emailId}`));
    }

    createEmployee(employee) {
        return axios.post(EMPLOYEE_API_BASE_URL.concat("addEmployee"), employee);
    }

    getEmployeeById(emailid) {
        return axios.get(EMPLOYEE_API_BASE_URL.concat(`getEmployee/${emailid}`));
    }

    updateEmployee(id, employee) {
        return axios.post(EMPLOYEE_API_BASE_URL.concat(`updateEmployee/${id}`),employee)
}

deleteEmployee(id){
    return axios.delete(EMPLOYEE_API_BASE_URL.concat(`deleteEmployee/${id}`));
}
}

export default new EmployeeService();