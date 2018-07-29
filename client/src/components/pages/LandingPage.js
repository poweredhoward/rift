import React from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import "./css/landingPage.css"


// import axios from "axios";


class LandingPage extends React.Component{
  componentDidMount(){
    axios.get("/getsession").then(res=>{
      console.log(res);
      if(res.data.userType==="teacher" &&res.data.user !==undefined){
        this.props.history.push("/teacherclassNameselect");
      }
      else if(res.data.userType==="student" && res.data.user !==undefined){
        this.props.history.push("/studenthomepage");
      }
      else{
        console.log("not logged in!");
      }
    });
   
  }
  
  
  render(props){

    return(
    
      

      <div className="jumbotron jumbotron-fluid">
      <h1 className="display-4">Rift</h1>
      <p className="lead">Rift serves as a hub for students and teachers to ask questions and share className notes</p>
      <hr className="my-4"/>
      
      
      <Link to="/studentlogin" className="btn btn-primary btn-lg" role="button">Student</Link>
      <Link to="/teacherlogin"  className="btn btn-primary btn-lg" role="button">Teacher</Link>
     
      

      </div>

    
    
    );
  

  }

}

export default LandingPage;