import React from "react";

const Modal = ({ handleClose, show, handleSubmit, handleInputChange, title, body }) => {
    const showHideClassName = show ? 'modal display-block' : 'modal display-none';
  
    return (
        <div className={showHideClassName}>
            <div className='modal-main'>
                <form>
                    <div className="form-group">
                        <h2><label  htmlFor="posttitle">Title</label></h2>
                        <input onChange={handleInputChange} type="email" className="modal-input form-control" id="posttitle" placeholder="Post Title..." value={title}/>
                    </div>

                    <div className="form-group">
                        <h2><label htmlFor="postbody">Post</label></h2>
                        <textarea onChange={handleInputChange} className="modal-input form-control" id="postbody" placeholder="Post Body..." rows="3" value={body}></textarea>
                    </div>
                </form>
                <button className="btn btn-dark btn-modal" onClick={handleClose}> Close </button>
                <button className="btn btn-dark btn-modal" onClick={handleSubmit}> Submit </button>
                
            </div>
        </div>
    );
  };

export default Modal;