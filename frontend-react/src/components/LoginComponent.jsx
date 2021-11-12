import React, { Component } from 'react';
import EmployeeService from "../services/EmployeeService";

class LoginComponent extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: "",
			password: "",
			message: ""
		};

	}
	login = (event) => {
		event.preventDefault();
		if (this.state.userName.trim() !== "" && this.state.password.trim() !== "") {
			EmployeeService.getEmployeeAuth(this.state.userName).then(res => {
				let employee = JSON.parse(JSON.stringify(res.data));
				if (Object.keys(res.data).length === 0 || employee.password !== this.state.password) {
					this.setState({ message: "Invalid Credentials !!" });
				} else if (employee.role === "admin") {
					this.props.history.push("/admin");
				} else if (employee.role === "employee") {
					this.props.history.push(`/view-employee-information/${employee.email}`);
				}
			});
		} else {
			this.setState({ message: "Username/Password cannot be blank!!" });
		}

		//this.props.history.push("/admin");
	}


	render() {
		return (
			<div>
				<div className={"container mt-3"}>
					<div className={"row "}>
						<div className={"card col-md-6 offset-md-3 offset-md-3"}>
							<h3 className={"text-center"}>Login Information</h3>
							<div className={"card-body"}>
								<form onSubmit={this.login}>
									<div className={"form-group"}>
										<label for='username' className={"col-sm-3 remove-left"}> Username: </label>
										<input id='username'
											className={"col-sm-9 "}
											placeholder={"Please Enter Username"}
											value={this.state.userName}
											onChange={event => this.setState({ userName: event.target.value, message: "" })}
											required
										/>
									</div>
									<div className={"form-group"}>
										<label for="password" className={"col-sm-3 remove-left"}> Password: </label>
										<input id='password'
											className={"col-sm-9"}
											placeholder={"Please Enter Password"}
											type="password"
											value={this.state.password}
											onChange={event => this.setState({ password: event.target.value, message: "" })}
											required
										/>
									</div>

									<button type="submit"
										className={"btn btn-success"}>Login</button>
									<button type="" className={"btn btn-danger ml-2"} >Clear</button>
									<label className={"error-message"}>{this.state.message}</label>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default LoginComponent;