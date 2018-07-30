import React from "react";


 const StudentSidebar = (props) => (
    props.units.map(item => (<p>{item.name}</p>))
 )

 

 export default StudentSidebar;
            
