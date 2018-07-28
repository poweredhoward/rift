import React from "react";
import {Link} from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar"
import TeacherUnitMain from "./teacherunit/TeacherUnitMain"
import axios from "axios";


class TeacherHomePage extends React.Component {
    constructor(props){
        super(props);
        console.log(props.classroomName);
    }

    state = {
        currentTeacherId: "",
        units: []

    }
    
    componentDidMount(){
        axios.get("/getsession").then(res=>{
            // console.log(res);
            //if there is a session
            if(res.data.user !==undefined){
                console.log("loggedIn!");
                this.setState({teacherid: res.data.user._id});
               
              }
              else{
                  console.log("not logged in");
                this.props.history.push
                ("/teacherlogin");
              }

           
        }).catch(err=>{
           console.log(err);
           this.props.history.push
                ("/teacherlogin");


        })
        
    }
    
    
    addUnit = ()=>{

    }

    render(){
        return(
            <div>
                <TeacherSidebar units={this.state.units} />
                <TeacherUnitMain />
            </div>
                
        
        );
    
    }
}
export default TeacherHomePage;