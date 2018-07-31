import React from "react";

const StudentComponent = (props) =>{
    var addStudent =<h1>hello world</h1>;
    if(props.userType==="student"){
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

    return (
        <div>
            <h1>hey this is student component</h1>
            {addStudent}
        </div>
    )
}

export default StudentComponent;