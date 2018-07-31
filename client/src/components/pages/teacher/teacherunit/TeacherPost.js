import React from "react";
import Dashboard from "./modal/Dashboard";

const TeacherPost = (props) => {
    
    return (<div>
            <Dashboard unitId={props.unitId} />
            {props.posts.map(item=>
                (
                <div  key={item._id}>
                    <h4>{item.data}</h4>
                    {item.responses.map(item=>
                        (<h6 key={item._id}>{item.data}</h6>)
                    )}
                
                    <input type="text" onChange={props.handleInputChange} id="newResponse" />
                    <button type="button"  onClick={()=>props.addResponse(item._id)}>Add Response</button>
                </div>
                )
            )}
            
            {/* <input type="text" onChange={props.handleInputChange} id="newPost" value={props.inputvalue}/>
            <button type="button"  onClick={props.addPost}>Add Post</button> */}

            </div>
       
    
    )
}
// <h1>{item.data}</h1>

export default TeacherPost;