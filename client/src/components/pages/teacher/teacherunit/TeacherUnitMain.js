import React from "react";
import TeacherNote from "./TeacherNote";
import TeacherPost from "./TeacherPost";
const TeacherUnitMain= (props) => { 
        var data;
        if(props.currentChoice==="Students"){
                data = <h1>This is Students</h1>
        }
        else if(props.currentChoice==="Notes"){
                
                data = <TeacherNote notes={props.notes} getNotes={props.getNotes} id={props.id}/>
        }
        else if(props.currentChoice==="Posts"){
                // console.log(props.posts);
                data = <TeacherPost addResponse={props.addResponse} handleInputChange={props.handleInputChange} addPost={props.addPost} posts ={props.posts} inputvalue={props.inputvalue}></TeacherPost>
        }
        var addStudent;
        if(props.userType==="Student"){
                console.log("student type");
                addStudent = "";
        }
        else{
                console.log("teacehrt");
                addStudent= ( 
                        <div>
                                <input type="text" id="newStudent" onChange={props.handleInputChange} value={props.newStudent} />
                                <button type="button" onClick={props.addStudent} className="btn btn-primary">Add student</button>
                        </div>
                      )
                
        }       
    
        return(<div>
             
                <div id="navbar"  >
                  <ul className="nav  d-flex flex-row-reverse " >
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
                {data}

                <h1>This is the main component for each unit</h1>

                {addStudent}
           

        </div>
           
        )
    
}

    
export default TeacherUnitMain;