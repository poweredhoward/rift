import React from "react";
import axios from "axios";


class TeacherClassSelect extends React.Component {

    state = {
        classes: ["itemOne", "itemTwo"]
    }

    componentDidMount(){
        axios.get("/test123").then(res=>{
            console.log(res.data.user);
            if(res.data.user===undefined){
                console.log("Not logged in, redirecting.");
                this.props.history.push("/teacherlogin")
            }else{
                console.log("login successful");
            }
        });
    }
    // Get request to teacher model to return list of classes


    // Method for adding a classroom -- posts to mongoose and gets right after



    render(){
        return(
                // this.classes.map(item => (<Link classid={item.id} />))
                <h1>This is home page for teacher</h1>
        );
    
    }
}
export default TeacherClassSelect;

        
