import React, { Component } from 'react';
import EmployeeService from "../services/EmployeeService";

class UpdateEmployeeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.email, // get the id param from the rout (from URL path)
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            supervisor: '',
            addressLine1: '',
            addressLine2: '',
            postCode: ''
        };
        this.updateEmployee = this.updateEmployee.bind(this)
    }

    componentDidMount() {
        console.log(`inside component mount ${this.state.id}`)
        EmployeeService.getEmployeeById(this.state.id).then(res => {
            let employee = res.data;
            this.setState({
                firstName: employee.firstName,
                lastName: employee.lastName,
                email: employee.email,
                phone: employee.phone,
                supervisor: employee.supervisor,
                addressLine1:employee.address.addressLine1,
                addressLine2:employee.address.addressLine2,
                postCode:employee.address.postCode
            });
        })
    }

    updateEmployee(event) {
        event.preventDefault();
        let employee = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            contact: this.state.contact,
            email: this.state.email,
            phone: this.state.phone,
            supervisor: this.state.supervisor,
            address: {
                addressLine1: this.state.addressLine1,
                addressLine2: this.state.addressLine2,
                postCode: this.state.postCode
            }

        }
        console.log("employee: " + JSON.stringify(employee));
        EmployeeService.updateEmployee(this.state.id, employee).then((res) => {
            this.props.history.push("/admin");
        }
        );
    }



    cancel() {
        this.props.history.push("/admin");
    }

    render() {
        return (
            <div>
                <div className={"container mt-3"}>
                    <div className={"row "}>
                        <div className={"card col-md-6 offset-md-3 offset-md-3"}>
                            <h3 className={"text-center"}>{"Update Employee Details"}</h3>
                            <div className={"card-body"}>
                                <form>
                                    <div className={"form-group"}>
                                        <label> First Name: </label>
                                        <input className={"form-control"}
                                            value={this.state.firstName} onChange={(event) => this.setState({ firstName: event.target.value })} />
                                    </div>
                                    <div className={"form-group"}>
                                        <label> Last Name: </label>
                                        <input className={"form-control"}
                                            value={this.state.lastName} onChange={(event) => this.setState({ lastName: event.target.value })} />
                                    </div>
                                    <div className={"form-group"}>
                                        <label> Email:  </label>
                                        <input className={"form-control"}
                                            value={this.state.email} onChange={(event) => this.setState({ email: event.target.value })} />
                                    </div>
                                    <div className={"form-group"}>
                                        <label> Phone:  </label>
                                        <input className={"form-control"}
                                            value={this.state.phone} onChange={(event) => this.setState({ phone: event.target.value })} />
                                    </div>
                                    <div className={"form-group"}>
                                        <label> Supervisor: </label>
                                        <input className={"form-control"}
                                            value={this.state.supervisor} onChange={(event) => this.setState({ supervisor: event.target.value })} />
                                    </div>
                                    <div className={"form-group"}>
                                        <label> Address: </label>
                                        <input className={"form-control"}
                                            value={this.state.addressLine1} onChange={(event) => this.setState({ addressLine1: event.target.value })} />
                                        <input className={"form-control"}
                                            value={this.state.addressLine2} onChange={(event) => this.setState({ addressLine2: event.target.value })} />
                                        <input className={"form-control"}
                                            value={this.state.postCode} onChange={(event) => this.setState({ postCode: event.target.value })} />
                                    </div>
                                    <button className={"btn btn-success"} onClick={this.updateEmployee}>Apply</button>
                                    <button className={"btn btn-danger ml-2"} onClick={this.cancel.bind(this)}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}



export default UpdateEmployeeComponent;
