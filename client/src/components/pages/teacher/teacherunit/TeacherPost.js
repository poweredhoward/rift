import React from "react";
// import Dashboard from "./modal/Dashboard";
import Modal from "./modal/Modal";

//Show posts and responses
const TeacherPost = (props) => {
    var posts = props.posts
    return (<div>
            <Modal
            handleClose={props.hideModal}
            show={props.show} 
            currentUnitName={props.currentUnitName} 
            updateDisplay={props.updateDisplay} 
            unitId={props.unitId} 
            handleSubmit={props.handleSubmit}
            handleInputChange={props.handleInputChange}
            title={props.posttitle}
            body={props.postbody}/>
              <button className='btn btn-dark' type='button' onClick={props.showModal}>Add Post</button>
            {posts.map(item=>
                (
                <div className='post_wrapper'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className ="card postCard" key={item._id}>
                                <div className="card-header">
                                    <h4 className ="post-card-title card-title">{item.title}</h4>
                                </div>

                                <div className ='card-body'>
                                    <div className ="card-text">{item.data}</div>
                                </div>

                                {/* <div className ="card-footer"></div> */}

                                    <ul className='list-group'>
                                        {item.responses.map(item=>
                                            (<li className='list-group-item' key={item._id}>{item.data}</li>)
                                        )}
                                    </ul>
                                   
                                    <input type="text" onChange={props.handleInputChange} id="newResponse" placeholder="Reply..."/>
                                    <button className='btn btn-dark btn-block' type="button"  onClick={()=>{
                                        props.addResponse(item._id);
                                        this.value="";
                                    }}>Add Response</button>
                                
                            </div>
                        </div>
                    </div>
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