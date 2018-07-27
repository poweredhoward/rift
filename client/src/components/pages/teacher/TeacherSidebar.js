import React from "react";


 const TeacherSidebar = (props) => (
     <div>
        {props.units.map(item => (<p>{item}</p>))}
        <button>Add Unit</button>
    </div>
 )

 export default TeacherSidebar;