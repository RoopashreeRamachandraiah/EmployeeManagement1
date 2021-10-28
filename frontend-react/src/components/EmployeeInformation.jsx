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
            email:''
        };
    }
     componentDidMount() {
        EmployeeService.getEmployeeById(this.state.id).then(res=>{
            let employee = res.data;
            this.setState({firstName: employee.firstName, lastName:employee.lastName, email:employee.email});
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
                                               value={this.state.lastName} onChange={this.changeLastNameHandler}/>
                                    </div>
                                    <div className={"form-group"}>
                                        <label> Contact:  </label>
                                        <input className={"form-control"} placeholder={"Contact"} name={"contact"}
                                               value={this.state.contact} onChange={this.changeContactHandler}/>
                                    </div>
                                    <div className={"form-group"}>
                                        <label> Role:  </label>
                                        <input className={"form-control"} placeholder={"Role"} name={"role"}
                                               value={this.state.role} onChange={this.changeRoleHandler}/>
                                    </div>
                                    <div className={"form-group"}>
                                        <label> Email: </label>
                                        <input className={"form-control"} placeholder={"Email"} name={"email"}
                                               value={this.state.email} onChange={this.changeEmailHandler}/>
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