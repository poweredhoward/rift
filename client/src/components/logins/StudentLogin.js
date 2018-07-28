import React from "react";
// import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";


class StudentLogin extends React.Component{

    state = {
        userKey : "",
        classroomKey: ""
    }

    componentDidMount(){
        //will check whether user is logged in
        axios.get("/getsession").then(res=>{
            if(res.data.user !==undefined){
                this.props.history.push("/studenthomepage");
            }
            else{
                console.log("not logged in");
            }
        });
    }
    //verify in classroom's model
    verifyStudent = ()=>{
        console.log(this.state.userKey + " "+this.state.classroomKey);
        if(this.state.userKey===""|| this.state.classroomKey===""){
            alert("fill all fields");
        }
        else{
            console.log("sending data to verify");
            axios.post("/studentlogin/verify", {
                userkey: this.state.userKey,
                classroomKey: this.state.classroomKey
            }).then((sessionData)=>{
                //"user" refers to req.session
                console.log("data sent to backend!");
                console.log(sessionData);
                // this.props.history.push("/studenthomepage");
            }).catch(err=>{
                console.log(err);
                alert("Check username or password!");
            });
        }
      

    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
            
        });
    }

    checkKeys = () => {

        this.props.history.push("/studenthomepage");
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
                    <button type="button" className="btn btn-primary" onClick={this.verifyStudent}>Submit</button>
                </form>
            </div>
        )
    };
}
  



export default StudentLogin;