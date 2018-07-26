import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage"
import StudentLogin from "./logins/StudentLogin"
import TeacherLogin from "./logins/TeacherLogin"

// import axios from "axios";


const Main = () =>(
  <Router>
    <div>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/studentlogin" component={StudentLogin} />
      <Route exact path="/teacherlogin" component={TeacherLogin} />
    </div>
  </Router>
  

  

);

export default Main;