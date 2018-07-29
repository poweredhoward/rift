import React from "react";
import StudentSidebar from "./StudentSidebar";
import StudentUnitMain from "./studentunit/StudentUnitMain"
import axios from "axios"

class StudentHomePage extends React.Component {
    
    state = {
        units: ["unit 1", "unit 2", "unit 3"],
        //temporary user state
        user:{}

    }
    // axios.get() the units based on classroom id from session storage and setState of units to array of classroom's units
    getUnits = () => {
        
    }
    componentDidMount(){
        axios.get("/getsession").then(res=>{
            if(res.data.user!==undefined){
                console.log("logged in");
                this.setState({user: res.data.user});
            }
            else{
                this.props.history.push("/studentlogin");
            }
        }).catch(err=>{
            console.log(err);
            this.props.history.push("/studentlogin");

        })

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