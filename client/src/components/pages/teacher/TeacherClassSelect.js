import React from "react";
import {Link} from "react-router-dom";
import TeacherHomePage from "./TeacherHomePage"
import axios from "axios";


class TeacherClassSelect extends React.Component {

    state = {
        classes: [
            {
                name: "Biology",
                key: 1,
                units: ['unit 1', 'unit 2', 'unit 3'],
                students: ["edgar", "erick", "matt", "kyle"],
                id: "1234"
            },
            {
                name: "Chemistry",
                key: 2,
                units: ['unit 1', 'unit 2', 'unit 3'],
                students: ["edgar", "erick", "matt", "kyle"],
                id: "3456"
            }
        ]
    }

    componentDidMount(){
        axios.get("/test123").then(res=>{
            console.log(res);
        })
    }
    // Get request to teacher model to return list of classes


    // Method for adding a classroom -- posts to mongoose and gets right after



    render(){
        return(
                
                <div>
                    <h1>This is home page for teacher</h1>
                    <button>Add Class</button>
                    {this.state.classes.map(item => (<Link to="/teacherhomepage" classroomid={item.id} key={item.key}>{item.name}</Link>))}
                    
                </div>

                
        );
    
    }
}
export default TeacherClassSelect;

        
