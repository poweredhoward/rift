import React from "react";
import StudentSidebar from "./StudentSidebar";
import axios from "axios"

class StudentHomePage extends React.Component {
    
    state = {
        units: ["unit 1", "unit 2", "unit 3"]
    }
    // axios.get() the units based on classroom id from session storage and setState of units to array of classroom's units
    getUnits = () => {
        
    }



    render(){
        return(
            <StudentSidebar units={this.state.units} />
        )
    }
}

export default StudentHomePage;