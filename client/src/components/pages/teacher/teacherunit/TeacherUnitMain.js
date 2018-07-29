import React from "react";

const TeacherUnitMain= (props) => {
   
    
        return(<div>
             <h1>This is the main component for each unit</h1>
            <input type="text" id={props.id} onChange={props.handleInputChange} />
            <button type="button" onClick={props.addStudent}>Add student</button>
           

        </div>
           
        )
    
}

    
export default TeacherUnitMain;