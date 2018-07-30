import React from "react";
import StudentSidebar from "./StudentSidebar";
import StudentUnitMain from "./studentunit/StudentUnitMain"
import axios from "axios"

class StudentHomePage extends React.Component {
    
    state = {
        units: [],
        //temporary user state
        studentName:"",
        studentId:"",

        currentClassroom :""

    }
    // axios.get() the units based on classroom id from session storage and setState of units to array of classroom's units
    getUnits=()=>{
        axios.get(`/${this.state.currentClassroom}/units`).then(res=>{

            //adds info for each unit
            this.setState({units:res.data});
        });
    }
    componentDidMount(){
        axios.get("/getsession").then(res=>{
            if(res.data.user!==undefined){
                console.log("logged in");
                console.log(res);
                this.setState({
                    studentName: res.data.user.name,
                    studentId:res.data.user._id,
                    currentClassroom: res.data.classroom
                });
                this.getUnits()
            
                console.log("user state");
                console.log(this.state);

                
            }
            else{
                this.props.history.push("/studentlogin");
            }
        }).catch(err=>{
            console.log(err);
            this.props.history.push("/studentlogin");

        });

        

    }



    render(){
        return(
            <div>
                <StudentSidebar key={Math.random()} units={this.state.units} />
                <StudentUnitMain />
            </div>
        )
    }
}

export default StudentHomePage;