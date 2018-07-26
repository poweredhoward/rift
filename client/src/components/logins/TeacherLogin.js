import React from "react";
// import { BrowserRouter as Router, Route } from "react-router-dom";

// import axios from "axios";


class TeacherLogin extends React.Component{

    state = {
        username : "",
        password: ""
    }

    checkUserKey(){

        this.props.history.push("/");
    }

    return(){
        return (
            <div>
                <form>
                    <div class="form-group">
                        <label for="username">Enter Username</label>
                        <input type="text" class="form-control" id="username" placeholder="Enter Username" />
                    </div>
                    <div class="form-group">
                        <label for="password">Enter Passord</label>
                        <input type="password" class="form-control" id="password" placeholder="Enter Password" />
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    };
}
  



export default TeacherLogin;