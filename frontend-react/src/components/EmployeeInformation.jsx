import React, {Component} from 'react';
import EmployeeService from "../services/EmployeeService";

class EmployeeInformation extends Component {
    constructor(props) {
        super(props);
		 this.state={
            id: this.props.match.params.id, // get the id param from the rout (from URL path)
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
                                        <label className={"col-sm-3 remove-left"}> Firstname: </label> 
										<label className={"col-sm-3 remove-left"}> employee.firstName
										</label> 
										
                                    </div>
                                    <div className={"form-group"}>
                                        <label className={"col-sm-3 remove-left"}> Lastname: </label> 
										<input 
											className={"col-sm-9 "} 
											value={""}
                           			/>
                                    </div>
                                    <div className={"form-group"}>
                                        <label className={"col-sm-3 remove-left"}> Email Id: </label> 
										<input 
											className={"col-sm-9 "} 
											value={""}
                           			/>
                                    </div>
                                    <button className={"btn btn-success"} >Apply</button>
                                    <button className={"btn btn-danger ml-2"} >Cancel</button>
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