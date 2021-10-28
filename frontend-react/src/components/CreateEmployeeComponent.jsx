import React, { Component } from 'react';
import EmployeeService from "../services/EmployeeService";

class CreateEmployeeComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            supervisor: '',
            address: {
                addressLine1: '',
                addressLine2: '',
                postCode: ''
            }
        };
        this.saveEmployee = this.saveEmployee.bind(this)
    }

    saveEmployee(event) {
        event.preventDefault();
        console.log("employee: " + JSON.stringify(this.state));
        EmployeeService.createEmployee(this.state).then(res => {
            this.props.history.push("/admin");
        }
        );
    }

    cancel() {
        this.props.history.push("/admin");
    }

    getTitle() {
        return "Add Employeee";
    }

    render() {
        return (
            <div>
                <div className={"container mt-3"}>
                    <div className={"row "}>
                        <div className={"card col-md-6 offset-md-3 offset-md-3"}>
                            <h3 className={"text-center"}>{this.getTitle()}</h3>
                            <div className={"card-body"}>
                                <form>
                                    <div className={"form-group"}>
                                        <label> First Name: </label>
                                        <input className={"form-control"} placeholder={"First Name"} name={"firstName"}
                                            value={this.state.firstName} onChange={(event) => this.setState({ firstName: event.target.value })} />
                                    </div>
                                    <div className={"form-group"}>
                                        <label> Last Name: </label>
                                        <input className={"form-control"} placeholder={"Last Name"} name={"lastName"}
                                            value={this.state.lastName} onChange={(event) => this.setState({ lastName: event.target.value })} />
                                    </div>
                                    <div className={"form-group"}>
                                        <label> Email:  </label>
                                        <input className={"form-control"} placeholder={"E-mail"} name={"email"}
                                            value={this.state.email} onChange={(event) => this.setState({ email: event.target.value })} />
                                    </div>
                                    <div className={"form-group"}>
                                        <label> Phone:  </label>
                                        <input className={"form-control"} placeholder={"Phone"} name={"phone"}
                                            value={this.state.phone} onChange={(event) => this.setState({ phone: event.target.value })} />
                                    </div>
                                    <div className={"form-group"}>
                                        <label> Supervisor: </label>
                                        <input className={"form-control"} placeholder={"Supervisor"} name={"supervisor"}
                                            value={this.state.supervisor} onChange={(event) => this.setState({ supervisor: event.target.value })} />
                                    </div>
                                    <div className={"form-group"}>
                                        <label> Address: </label>
                                        <input className={"form-control"} placeholder={"Address Line1"} name={"Address Line1"}
                                            value={this.state.address.addressLine1} onChange={(event) => this.setState({ address: { ...this.state.address, addressLine1: event.target.value } })} />
                                        <input className={"form-control"} placeholder={"Address Line2"} name={"Address Line1"}
                                            value={this.state.address.addressLine2} onChange={(event) => this.setState({ address: { ...this.state.address, addressLine2: event.target.value } })} />
                                        <input className={"form-control"} placeholder={"PostCode"} name={"PostCode"}
                                            value={this.state.address.postCode} onChange={(event) => this.setState({ address: { ...this.state.address, postCode: event.target.value } })} />
                                    </div>
                                    <button className={"btn btn-success"} onClick={this.saveEmployee}>Apply</button>
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

export default CreateEmployeeComponent;