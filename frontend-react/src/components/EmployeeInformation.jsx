import React, {Component} from 'react';
import EmployeeService from "../services/EmployeeService";

class EmployeeInformation extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
		 this.state={
            id: this.props.match.params.email, // get the id param from the rout (from URL path)
            firstName:'',
            lastName:'',
            phone: '',
            supervisor: '',
            email:'',
            addressLine1: '',
            addressLine2: '',
            postCode: ''
        };
    }
     componentDidMount() {
        EmployeeService.getEmployeeById(this.state.id).then(res=>{
            let employee = res.data;
            this.setState({firstName: employee.firstName, 
                           lastName:employee.lastName, 
                              email:employee.email,
                              phone: employee.phone, 
                         supervisor: employee.supervisor,
                         addressLine1:employee.address.addressLine1,
                        addressLine2:employee.address.addressLine2,
                          postCode:employee.address.postCode

      });
        }) }

    logOff(id){
		this.props.history.push("/");
	}
       
    render() {
        return (
            <div>
                <div className={"container mt-3"}>
                    <div className={"row "}>
                        <div className={"card col-md-6 offset-md-3 offset-md-3"}>
                            <h3 className={"text-center"}>Employee Information</h3>
                            <div className={"card-body"}>
                                <form>
                                    <div className={"form-group"}>
                                        <label> First Name: </label>
                                        <input className={"form-control"} 
                                            value={this.state.firstName} />
                                    </div>
                                    <div className={"form-group"}>
                                        <label> Last Name: </label>
                                        <input className={"form-control"} placeholder={"Last Name"} name={"lastName"}
                                               value={this.state.lastName} />
                                    </div>
                                    <div className={"form-group"}>
                                        <label> phone:  </label>
                                        <input className={"form-control"} placeholder={"phone"} name={"phone"}
                                               value={this.state.phone} />
                                    </div>
                                    <div className={"form-group"}>
                                        <label> Supervisor:  </label>
                                        <input className={"form-control"} placeholder={"supervisor"} name={"supervisor"}
                                               value={this.state.supervisor} />
                                    </div>
                                    <div className={"form-group"}>
                                        <label> Email: </label>
                                        <input className={"form-control"} placeholder={"Email"} name={"email"}
                                               value={this.state.email} />
                                    </div>
                                       <div className={"form-group"}>
                                        <label> Address: </label>
                                        <input className={"form-control"}
                                            value={this.state.addressLine1}  />
                                        <input className={"form-control"}
                                            value={this.state.addressLine2}  />
                                        <input className={"form-control"}
                                            value={this.state.postCode}  />
                                    </div>
                                 <button className={"btn btn-info"} onClick={() => this.logOff()}>LOGOFF</button>
                                 </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EmployeeInformation;