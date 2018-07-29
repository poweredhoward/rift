import React from "react";


 const TeacherSidebar = (props) => (
     <div>
        {props.units.map(item => (<p key={item._id}>{item.name}</p>))}
        <input type="text" id={props.id} onChange={props.handleInputChange} />
        <button type="button" onClick={props.addUnit}>Add Unit</button>
        
    </div>
 )

 export default TeacherSidebar;