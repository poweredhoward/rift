import React from "react";

//Get props from 
const Modal = ({ handleClose, show, handleSubmit, handleInputChange, title, body }) => {
    const showHideClassName = show ? 'modal display-block' : 'modal display-none';
  
    return (
        <div className={showHideClassName}>
            <section className='modal-main'>
                <form>
                    <div className="form-group">
                    <label  htmlFor="posttitle">Title</label>
                    <input onChange={handleInputChange} type="email" className="form-control" id="posttitle" value={title}/>
                    </div>

                    <div className="form-group">
                    <label htmlFor="postbody">Post</label>
                    <textarea onChange={handleInputChange} className="form-control" id="postbody" rows="3" value={body}></textarea>
                    </div>
                </form>
                <button onClick={handleClose}> Close </button>
                <button onClick={handleSubmit}> Submit </button>
                
            </section>
        </div>
    );
  };

export default Modal;