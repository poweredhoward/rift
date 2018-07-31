import React from "react";


 const TeacherSidebar = (props) => (
     <div className="sidebar">
        {props.units.map(item => (<p onClick={()=>props.selectUnit(item._id, item.name)} key={item._id}>{item.name}</p>))}
        <input type="text" id={props.id} onChange={props.handleInputChange} value={props.inputvalue} />
        <button className="btn btn-primary" type="button" onClick={props.addUnit}>Add Unit</button>
        
    </div>
 )

 export default TeacherSidebar;