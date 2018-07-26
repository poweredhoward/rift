import React from "react";
// import { BrowserRouter as Router, Route } from "react-router-dom";

// import axios from "axios";


const LandingPage = () =>(
  <div>
    <Link to="/studentlogin" role="button">Student</Link>
    <Link to="/teacherlogin" role="button">Teacher</Link>
    <p>Info</p>
  </div>

);

export default LandingPage;