import React from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import "./css/landingPage.css"


// import axios from "axios";


class LandingPage extends React.Component{
  componentDidMount(){
    axios.get("/getsession").then(res=>{
      // console.log(res);
      if(res.data.userType==="teacher" &&res.data.user !==undefined){
        this.props.history.push("/teacherclassselect");
      }
      else if(res.data.userType==="student" && res.data.user !==undefined){
        this.props.history.push("/classroom");
      }
      else{
        // console.log("not logged in!");
      }
    });

   
  }
  
  
  render(props){

    return(
      <div className='Wrapper1'>
        <div className="logoContainer row">
            <img className='logo' src="https://png.icons8.com/material/50/ffffff/jet-engine.png"/>
            <h2 className='logotitle'>Rift</h2>
        </div>
        <div className='row'>
        <div className='col-md-3'></div>
          <div className='col-md-6'>
            <h3 className="lead">Rift serves as a hub for students and teachers to ask questions and share className notes</h3>
          </div>
          <div className='col-md-3'></div>
        </div>
        <div className='row'>
        <div className='col-md-4'></div>
          <div className='col-md-4'>
            <div className="ts">
              <h4>Which are you?</h4>
              {/* <hr className="my-4"/> */}
              <div className="buttons">
                <Link to="/studentlogin" className="btn btn-dark btn-lg" role="button" id="studentbutton">Student</Link>
              
                <Link to="/teacherlogin"  className="btn btn-dark btn-lg" role="button" id="teacherbutton">Teacher</Link>
            </div> 
            <div className='col-md-4'></div>    
          </div>
        </div>
      </div>
      </div>
    );
  

  }

}

export default LandingPage;
