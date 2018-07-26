import React from "react";
// import { BrowserRouter as Router, Route } from "react-router-dom";

// import axios from "axios";


class TeacherLogin extends React.Component{

    state = {
        username : "",
        password: ""
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    checkUserKey = () => {

        this.props.history.push("/");
    }

    render(){
        return (
            <div>
                <form>
                    <div className="form-group">
                        <label htmlFor="username">Enter Username</label>
                        <input type="text" className="form-control" id="username" placeholder="Enter Username" 
                        onChange={this.handleInputChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Enter Password</label>
                        <input type="password" className="form-control" id="password" placeholder="Enter Password" 
                        onChange={this.handleInputChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    };
}
  



export default TeacherLogin;