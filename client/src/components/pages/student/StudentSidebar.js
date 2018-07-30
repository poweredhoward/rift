import React from "react";


 const StudentSidebar = (props) => (
    <div className="sidebar">
        {props.units.map(item => (<p>{item.name}</p>))}
    </div>
 )

 

 export default StudentSidebar;
            
