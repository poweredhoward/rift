import React from "react";
import StudentSidebar from "./StudentSidebar";
import StudentUnitMain from "./studentunit/StudentUnitMain"
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
            <div>
                <StudentSidebar units={this.state.units} />
                <StudentUnitMain />
            </div>
        )
    }
}

export default StudentHomePage;