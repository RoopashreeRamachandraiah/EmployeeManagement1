import './App.css';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import ListEmployeesComponent from "./components/ListEmployeesComponent";
import FooterComponent from "./components/FooterComponent";
import HeaderComponent from "./components/HeaderComponent";
import CreateEmployeeComponent from "./components/CreateEmployeeComponent";
import EmployeeInformation from "./components/EmployeeInformation";
import UpdateEmployeeComponent from "./components/UpdateEmployeeComponent";
import LoginComponent from "./components/LoginComponent";

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent />
        <div className="container">
          <Switch>
            <Route exact path={"/admin"} component={ListEmployeesComponent} />
            <Route path={"/add-employee"} component={CreateEmployeeComponent} />
            <Route path={"/update-employee/:email"} component={UpdateEmployeeComponent} />
            <Route path={"/view-employee-information/:email"} component={EmployeeInformation} />
            <Route path={"/"} component={LoginComponent} />
          </Switch>
        </div>
        <FooterComponent />
      </Router>
    </div>
  );
}

export default App;
