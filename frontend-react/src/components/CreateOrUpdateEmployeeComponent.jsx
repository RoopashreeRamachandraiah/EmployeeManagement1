import React, {Component} from 'react';
import EmployeeService from "../services/EmployeeService";

class CreateOrUpdateEmployeeComponent extends Component {
    constructor(props) {
        super(props);

        this.state={
            id: this.props.match.params.id, // get the id param from the rout (from URL path)
            firstName:'',
            lastName:'',
            role:'',
            contact:'',
            email:'',
            password:''
        };

        this.changeFirstNameHandler=this.changeFirstNameHandler.bind(this)
        this.changeLastNameHandler=this.changeLastNameHandler.bind(this)
        this.changeContactHandler=this.changeContactHandler.bind(this)
        this.changeEmailHandler=this.changeEmailHandler.bind(this)
        this.changePasswordHandler=this.changePasswordHandler.bind(this)
        this.changeRoleHandler=this.changeRoleHandler.bind(this)
        this.saveOrUpdateEmployee=this.saveOrUpdateEmployee.bind(this)
    }

    componentDidMount() {
	console.log(`inside component mount ${this.state.id}`)
        EmployeeService.getEmployeeById(this.state.id).then(res=>{
            let employee = res.data;
            this.setState({firstName: employee.firstName, lastName:employee.lastName, email:employee.email});
        })
    }

    changeFirstNameHandler(event) {
    this.setState({firstName:event.target.value})
    }

    changeLastNameHandler(event) {
    this.setState({lastName:event.target.value})
    }

    changeEmailHandler(event) {
    this.setState({email:event.target.value})
    }

    changeContactHandler(event) {
    this.setState({contact:event.target.value})
    }

    changePasswordHandler(event) {
    this.setState({password:event.target.value})
    }

    changeRoleHandler(event) {
    this.setState({role:event.target.value})
    }

    saveOrUpdateEmployee(event){
        event.preventDefault();
        let employee= {firstName:this.state.firstName, lastName:this.state.lastName, contact:this.state.contact, email:this.state.email,
                       password:this.state.password  }
        console.log("employee: " + JSON.stringify(employee));
		console.log(this.state.id);
		        if (this.props.history.location.pathname === '/add-employee/_add') {
			console.log("add employee");
            EmployeeService.createEmployee(employee).then(res=>{
                this.props.history.push("/admin");}
            );
        }else{
            EmployeeService.updateEmployee(this.state.id,employee).then((res)=>{
                this.props.history.push("/admin");}
            );
        }

    }

    cancel(){
        this.props.history.push("/admin");
    }

    getTitle(){
        return this.props.history.location.pathname === '/add-employee/_add' ? "Add Employee" : "Update Employee";
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
                                            value={this.state.firstName} onChange={this.changeFirstNameHandler}/>
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
                                     <div className={"form-group"}>
                                        <label> Password: </label>
                                        <input type="password"className={"form-control"} placeholder={"Password"} name={"password"}
                                               value={this.state.password} onChange={this.changePasswordHandler}/>
                                    </div>
                                    <button className={"btn btn-success"} onClick={this.saveOrUpdateEmployee}>Apply</button>
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

export default CreateOrUpdateEmployeeComponent;