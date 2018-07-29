import React from "react";
import {Link} from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar"
import TeacherUnitMain from "./teacherunit/TeacherUnitMain"
import axios from "axios";


class TeacherHomePage extends React.Component {


    state = {
        //todo: make key dynamic (probably thru session)
        key:"1234",
        teacherid: "",
        //todo: make classroom ID dynamic
        classroomId: "5b5cc1a32b2fbe26b46b5b9c",
        units: [],
        classroomName: "Biology",
        newUnit:"",
        newStudent:""

    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
      
    }
    
    componentDidMount(){
        axios.get("/getsession").then(res=>{
            // console.log(res);
            //if there is a session
            if(res.data.user !==undefined){
                console.log("loggedIn!");
                this.setState({teacherid: res.data.user._id});
                this.getUnits()
               
              }
              //redirect if user is not logged in
              else{
                  console.log("not logged in");
                this.props.history.push("/teacherlogin");
              }

           
        }).catch(err=>{
           console.log(err);
           this.props.history.push("/teacherlogin");
        })
    }
    //gets the units using a get request
    getUnits=()=>{
        axios.get(`/${this.state.classroomId}/units`).then(res=>{
            // this.setState({units: res.data});
            // console.log(res.data);
            //sets names and ids
            this.setState({units:res.data});
        });
    }
    addStudent = ()=>{
        console.log(this.state.newStudent);
        axios.post(`/new/${this.state.classroomId}/student`, {name:this.state.newStudent,
         token: `t${Math.random()}`,
         email: "hello@hello.com",
         key: this.state.key
         
        }).then(res=>{
            console.log(res);
        }).catch(err=>{
            console.log(err);

        });
        


    }
    //will make a post request to add a note to the given unit 
     addUnit = ()=>{
        console.log(this.state.newUnit);
        axios.post(`new/${this.state.classroomId}/unit`,{name: this.state.newUnit}).then(res=>{
            console.log(res);
            console.log("added!");
            this.getUnits();
        }).catch(err=>{
            console.log(err);
        })
        

    }

    render(){
        return(
            <div>
                <TeacherSidebar id="newUnit" addUnit={this.addUnit} handleInputChange={this.handleInputChange}  units={this.state.units} />
                <TeacherUnitMain id="newStudent" addStudent={this.addStudent} handleInputChange={this.handleInputChange} units={this.state.units} />
            </div>
                
        
        );
    
    }
}
export default TeacherHomePage;