import React from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";


// import axios from "axios";


class LandingPage extends React.Component{
  componentDidMount(){
    axios.get("/getsession").then(res=>{
      console.log(res);
      if(res.data.userType==="teacher" &&res.data.user !==undefined){
        this.props.history.push("/teacherclassselect");
      }
      else if(res.data.userType==="student" && res.data.user !==undefined){
        this.props.history.push("/studenthomepage");
      }
      else{
        console.log("not logged in!");
      }
    });
   
  }
  
  
  render(){

    return(
    
      <div>
       
          
          
        <Link to="/studentlogin" role="button">Student</Link>
        <Link to="/teacherlogin" role="button">Teacher</Link>
    
        <p>Info</p>
      </div>
    
    );
  

  }

}

export default LandingPage;