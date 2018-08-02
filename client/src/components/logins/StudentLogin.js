import React from "react";
// import { BrowserRouter as Router, Route } from "react-router-dom";

import axios from "axios";


class StudentLogin extends React.Component{

    state = {
        userKey : "",
        classroomKey: ""
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

   
    verifyInfo = ()=>{
        axios.post("/studentlogin/verify", {
            userkey: this.state.userKey,
            classroomkey:this.state.classroomKey
        }).then(response=>{
            console.log(response);
            console.log("login successful!")
            this.props.history.push("/classroom");
        }).catch(err=>{
            alert("Please double check your user key and password key!");
            console.log(err);
        })
    }

    render(){

        return (

            <div className='Wrapper1'>
            <div className="logoContainer row">
                <img className='logo' src="https://png.icons8.com/material/50/ffffff/jet-engine.png"/>
                <h2 className='logotitle'>Rift</h2>
            </div>
            <div className='row'>
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <div className="login">
                    <h3 className="loginheader">Student Login</h3>
                        <form>
                            <div className="form-group">
                                <label htmlFor="userKey">Enter User Key</label>
                                <input type="text" className="form-control" id="userKey" placeholder="Enter User Key" 
                                onChange={this.handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="classroomKey">Enter Classroom Key</label>
                                <input type="text" className="form-control" id="classroomKey" placeholder="Enter Classroom Key" 
                                onChange={this.handleInputChange}
                                />
                            </div>
                            <button type="button" className="btn btn-dark" onClick={this.verifyInfo}>Submit</button>
                        </form>
                    </div>
                </div>
                <div className="col-md-2"></div>
            </div>
            </div>
        )
    };
}
  



export default StudentLogin;