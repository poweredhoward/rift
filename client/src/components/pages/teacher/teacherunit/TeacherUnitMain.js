import React from "react";
import TeacherNote from "./TeacherNote";
import StudentComponent from "./StudentComponent"
import TeacherPost from "./TeacherPost";
const TeacherUnitMain= (props) => { 
        var data;
        var title = props.unitName;
        var alert = <h2>Please select a unit from the sidebar.</h2>
        var students; 
        if (title !== ""){
                alert = null;
                data = null;
        }
        
        

        if(props.currentChoice==="Students"){

                data = <StudentComponent students={props.students} handleInputChange={props.handleInputChange} addStudent={props.addStudent}></StudentComponent>
                // data = <h1>Students</h1>
                // students = <div><input type="text" id="newStudent" onChange={props.handleInputChange} value={props.newStudent} /><button type="button" onClick={props.addStudent} className="btn btn-primary">Add student</button></div>
                title = null;
        }
        else if(props.currentChoice==="Notes"){
                
                data = <TeacherNote  notes={props.notes} getNotes={props.getNotes} id={props.id} unitId={props.unitId} />

        }
        else if(props.currentChoice==="Posts"){
                // console.log(props.posts);
                if( title == ""){
                        data = null;
                }
                else{
                        data = <TeacherPost addResponse={props.addResponse} handleInputChange={props.handleInputChange} addPost={props.addPost} posts ={props.posts} inputvalue={props.inputvalue} unitId={props.unitId}></TeacherPost>
                }
        }
      
                
         
    
        return(<div>
             
                <div id="navbar"  >
                  <ul className="nav  d-flex flex-row-reverse" >
                  <li className="nav-item ">
                        <a className="nav-link active" href="###" id="user" onClick={props.logout} > Logout </a>
                </li>
                
                <li className="nav-item ">
                        <a className="nav-link active" href="###" id="user"  userid={props.id}>Welcome, {props.username} </a>
                </li>
                {/* mapped to make use of function*/}
                  {props.options.map(item=>( <li key={item}className="nav-item pull-right">
                        <a onClick={()=>props.infoChoice(item)} href="###" key={Math.random} className="nav-link" >{item}</a>
                </li>))}
              
                  </ul>
                  

                </div>
                {alert}
                <h1>{title}</h1>
                {data}
                {students}



        </div>
           
        )
    
}

    
export default TeacherUnitMain;