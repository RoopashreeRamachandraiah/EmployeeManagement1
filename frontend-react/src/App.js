import './App.css';
import {Switch,Route,BrowserRouter as Router } from  'react-router-dom'
import ListEmployeesComponent from "./components/ListEmployeesComponent";
import FooterComponent from "./components/FooterComponent";
import HeaderComponent from "./components/HeaderComponent";
import CreateOrUpdateEmployeeComponent from "./components/CreateOrUpdateEmployeeComponent";
import EmployeeInformation from "./components/EmployeeInformation";
import EmployeeInformationAdmin from "./components/EmployeeInformationAdmin";
import LoginComponent from "./components/LoginComponent";

function App() {
  return (
      <div>
        <Router>
          <HeaderComponent/>
            <div className="container">
              <Switch>
                <Route exact path={"/admin"} component={ListEmployeesComponent}/>
                <Route path={"/add-employee/_add"} component={CreateOrUpdateEmployeeComponent}/>
				<Route path={"/view-employee"} component={EmployeeInformationAdmin}/>
				<Route path={"/view-employee-information"} component={EmployeeInformation}/>
				<Route path={"/"} component={LoginComponent}/>
              </Switch>
            </div>
          <FooterComponent/>
        </Router>
      </div>
  );
}

export default App;
