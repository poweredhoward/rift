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
            this.props.history.push("/studenthomepage");
        }).catch(err=>{
            alert("Please double check your user key and password key!");
            console.log(err);
        })
    }

    render(){

        return (

            <div className="login">
                <h1 className="loginheader">Student Login</h1>
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
                    <button type="button" className="btn btn-primary" onClick={this.verifyInfo}>Submit</button>
                </form>
            </div>
        )
    };
}
  



export default StudentLogin;