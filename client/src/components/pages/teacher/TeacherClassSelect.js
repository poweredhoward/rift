import React from "react";
import {Link, Route} from "react-router-dom";
import axios from "axios";
import TeacherHomePage from "./TeacherHomePage";


class TeacherClassSelect extends React.Component {

    state = {
        classrooms: [
        
        ],
        teacherid: "",
        classroomName: "hellotest"
    }



    componentDidMount(){
        axios.get("/getsession").then(res=>{
            // console.log(res);
            //if there is a session
            if(res.data.user !==undefined){
                console.log("loggedIn!");
                this.setState({teacherid: res.data.user._id});
                this.getClassrooms();
              }
              //will redirect to teacherlogin if no teacher is logged in
              else{
                this.props.history.push("/teacherlogin");
              }

           
        }).catch(err=>{
            console.log(err);
            this.props.history.push("/teacherlogin");

        })
        
    }
    // Method for adding a classroom -- posts to mongoose and gets right after

    addClassroom = () => {
        var obj = {
            name: this.state.classroomName,
            key: Math.random()
        }
        axios.post(`/new/${this.state.teacherid}/classroom`, obj)
        .then((res) => {
            console.log("classroom has been added!");
            //getting classrooms
            this.getClassrooms();
        })
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    getClassrooms = () => {
        
        // Get request to teacher model to return list of classes
        axios.get(`/${this.state.teacherid}/classrooms`)
        .then((results) => {
            this.setState({
                classrooms : results.data
            });
            // console.log(this.state.classrooms);
        
        });
    }
  

    render(){
        return(
                // classroomid={item._id} key={item.key}
                <div>
                    <h1>This is home page for teacher</h1>
                    {this.state.classrooms.map(item => (<Link to="/teacherhomepage" key={item.key}>{item.name}</Link>))}
                    <input type="text" id="classroomName"
                    onChange={this.handleInputChange} 
                    />
                    <button
                    onClick={this.addClassroom}>Add Classroom</button>
                    {/* <Route exact path="/teacherhomepage" component={TeacherHomePage} /> */}
                    <Route exact path="/teacherhomepage" render={props=><TeacherHomePage {...props} classroomName={this.classroomName} />} />
                </div>    
        );
    
        
    }
}
export default TeacherClassSelect;










        
