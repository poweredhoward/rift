import React from "react";
import {Link} from "react-router-dom";
import axios from "axios";


class TeacherClassSelect extends React.Component {

    state = {
        classrooms: [
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
        ],
        teacherid: "123",
        classroomName: ""
    }



    componentDidMount(){
        axios.get("/test123").then(res=>{
            console.log(res);
            this.getClassrooms()
        })
        
    }

    addClassroom = () => {
        var obj = {
            name: this.state.classroomName
        }
        axios.post(`/new/${this.state.teacherid}/classroom`, obj)
        .then(() => {
            this.getClassrooms()
        })
    }

    handleInputChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        })
    }

    getClassrooms = () => {
        axios.get(`/teacher/${this.state.teacherid}`)
        .then((results) => {
            this.setState({
                classrooms : results
            })
        })
    }
    // Get request to teacher model to return list of classes


    // Method for adding a classroom -- posts to mongoose and gets right after



    render(){
        return(
                
                <div>
                    <h1>This is home page for teacher</h1>
                    {this.state.classrooms.map(item => (<Link to="/teacherhomepage" classroomid={item.id} key={item.key}>{item.name}</Link>))}
                    <input type="text" id="classroomName"
                    onChange={this.handleInputChange} 
                    />
                    <button
                    onClick={this.getClassrooms}>Add Classroom</button>
                </div>

                
        );
    
    }
}
export default TeacherClassSelect;










        
