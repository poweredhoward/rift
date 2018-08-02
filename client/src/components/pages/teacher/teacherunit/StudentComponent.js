import React from "react";
import StudentsUpload from "./StudentsUpload";
// import axios from "axios";

//Page to display and add students
const StudentComponent = (props) =>{
    var studentContent;

    if(props.students.content!==[]){
        studentContent= (
            <table>
                <thead>
                <tr>
                <th scope="col"></th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>

                {props.userType==="teacher" ? <th scope="col">Key</th> : null }
                </tr>
                </thead>
                <tbody>
                {props.students.map((item, i)=>(
                    <tr key={item._id}>
                    <th scope="row">{i+1}</th>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    {props.userType==="teacher" ?  <td>{item.key}</td> : null }                   

                    </tr>
                )
                    
                )}

                </tbody>
            </table>            
            
            );

    }
    else{
        studentContent ="";
    }
  

    var formContent =<h1>Students</h1>;
    if(props.userType==="student"){
            // console.log("student type");
            formContent = "";
    }

    var uploadContent = null;
    if(props.userType === "teacher"){
        uploadContent = <div>
                <h2>Or Add Multiple Students With a Text File</h2>
                <StudentsUpload classroomId={props.classroomId} getStudents={props.getStudents}/>
            </div>
             formContent= ( 

                <div>
                    <form>
                        <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Student Name</label>
                                <input type="text" onChange={props.handleInputChange} className="form-control" id="newStudent" placeholder="Password"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input onChange={props.handleInputChange} type="email" className="form-control" id="studentEmailInput" aria-describedby="emailHelp" placeholder="Enter email"/>
                         
                        </div>
                        
                       
                        <button onClick={props.addStudent} type="button" className="btn btn-primary">Add Student</button>
                    </form>
                </div>
              )
    }
    else{
            // console.log("teacher");
           
            
    }       

    return (
        <div>
           
            {studentContent}
            {formContent}
            {uploadContent}
        </div>
    )
}

export default StudentComponent;