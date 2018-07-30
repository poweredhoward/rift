import React from "react";
import TeacherNote from "./TeacherNote";
import TeacherPost from "./TeacherPost";
const TeacherUnitMain= (props) => { 
        var data;
        if(props.currentChoice==="Students"){
                data = <h1>This is Students</h1>
        }
        else if(props.currentChoice==="Notes"){
                
                data = <TeacherNote notes={props.notes}/>
        }
        else if(props.currentChoice==="Posts"){
                // console.log(props.posts);
                data = <TeacherPost addResponse={props.addResponse} handleInputChange={props.handleInputChange} addPost={props.addPost} posts ={props.posts}></TeacherPost>
        } 
    
        return(<div>
             <h1>This is the main component for {props.unitName}</h1>
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
                  {data}

                </div>
            {/* <input type="text" id={props.id} onChange={props.handleInputChange} />
            <button type="button" onClick={props.addStudent}>Add student</button> */}
         

        </div>
           
        )
    
}

    
export default TeacherUnitMain;