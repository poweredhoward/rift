import React from "react";
// import { BrowserRouter as Router, Route } from "react-router-dom";

// import axios from "axios";


class StudentLogin extends React.Component{

    state = {
        userKey : ""
    }

    checkUserKey(){

        this.props.history.push("/");
    }

    return(){
        return (
            <div>
                <form>
                    <div class="form-group">
                        <label for="userKey">Enter User Key</label>
                        <input type="text" class="form-control" id="userKey" placeholder="Enter User Key" />
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    };
}
  



export default StudentLogin;