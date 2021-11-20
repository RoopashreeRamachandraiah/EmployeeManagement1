import React, {Component} from 'react';
import EmployeeService from "../services/EmployeeService";

class ListEmployeesComponent extends Component {
    constructor(props) {
        super(props);
        this.state={
            employees: []
        }
        this.addEmployee= this.addEmployee.bind(this);
        this.updateEmployee= this.updateEmployee.bind(this)
        this.deleteEmployee= this.deleteEmployee.bind(this)
        this.viewEmployee= this.viewEmployee.bind(this)
    }

    componentDidMount() {
        console.log('in side component mount');
        EmployeeService.getEmployees().then((res)=>{
            console.log(res)
            this.setState({employees:res.data})
        })
            
    }

    addEmployee(){
        this.props.history.push("/add-employee/_add");
    }

    updateEmployee(id) {
        this.props.history.push(`/update-employee/${id}`);
    }

    deleteEmployee(id){
        EmployeeService.deleteEmployee(id).then(res =>{
            this.setState({employees:this.state.employees.filter(employee=> employee.id!=id)})
        } );
    }

	viewEmployee(id){
		this.props.history.push("/view-employee/${id}");
	}
    logOff(id){
		this.props.history.push("/");
	}
    render() {
        return (
            <div>
                <h2 className={"text-center"}> Employees List </h2>
                <div className={"row"}>
                    <button className={"btn btn-primary mb-2"} onClick={this.addEmployee}>Add Employee</button>
                </div>
                <div className={"row"}>
                    <table className={"table table-striped table-bordered"}>
                        <thead>
                        <tr>
                            <th>Employee Id</th>
							<th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Action</th>

                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.employees.map(
                                employee =>
                                <tr key={employee.id}>
                                    <td>{employee.id}</td>
									<td>{employee.firstName}</td>
                                    <td>{employee.lastName}</td>
                                    <td>{employee.email}</td>
                                    <td>
                                        <button className={"btn btn-info"} onClick={() => this.updateEmployee(employee.email)}>Update/View details</button>
                                        <button className={"btn btn-danger ml-2"} onClick={() => this.deleteEmployee(employee.id)}>Delete</button>
										
                                    </td>

                                </tr>
                            )
                        }

                        </tbody>
                    </table>
                   <button className={"btn btn-info"} onClick={() => this.logOff()}>LOGOFF</button>

                </div>
            </div>
        );
    }
}

export default ListEmployeesComponent;