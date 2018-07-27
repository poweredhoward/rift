import React from "react";
import {Link} from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar"
import axios from "axios";


class TeacherHomePage extends React.Component {

    state = {
        units: ["Unit 1", "Unit 2", "Unit 3"],
        navbarselection

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