import React from "react";
import Dashboard from "./modal/Dashboard";

const TeacherPost = (props) => {
    var posts = props.posts.reverse()
    return (<div>
            <Dashboard unitId={props.unitId} />
            {posts.map(item=>
                (
                <div className="posts" key={item._id}>
                    <h3>{item.title}</h3>
                    <h5>{item.data}</h5>
                    {/* {item.responses.map(item=>
                        (<h6 key={item._id}>{item.data}</h6>)
                    )}
                
                    <input type="text" onChange={props.handleInputChange} id="newResponse" />
                    <button type="button"  onClick={()=>props.addResponse(item._id)}>Add Response</button> */}
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