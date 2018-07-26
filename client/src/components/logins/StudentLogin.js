import React from "react";
// import { BrowserRouter as Router, Route } from "react-router-dom";

// import axios from "axios";


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

    checkKeys(){

        this.props.history.push("/");
    }

    render(){

        return (

            <div>
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
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    };
}
  



export default StudentLogin;