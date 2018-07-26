import React from "react";


 const StudentSidebar = (props) => (
    props.units.map(item => (<p>{item}</p>))
 )

 export default StudentSidebar;
            
