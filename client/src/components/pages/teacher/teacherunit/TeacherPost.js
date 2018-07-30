import React from "react";

const TeacherPost = (props) => {
    // console.log(props);

    return (<div>
            {props.posts.map(item=>
            (
            <div>
            <h4 key={item._id}>{item.data}</h4>
            <input type="text" onChange={props.handleInputChange} id="newPost" />
            <button type="button"  onClick={()=>props.addResponse(item._id)}>Add Response</button>
            </div>
            )
        )}
          <input type="text" id="newResponse" onChange={props.handleInputChange} id="newPost" />
            <button type="button"  onClick={props.addPost}>Add Post</button>

              </div>
       
    
    )
}
// <h1>{item.data}</h1>

export default TeacherPost;