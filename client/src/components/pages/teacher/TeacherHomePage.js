import React from "react";
// import {Link} from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar"
import TeacherUnitMain from "./teacherunit/TeacherUnitMain"
import axios from "axios";
// import { runInNewContext } from "vm";


class TeacherHomePage extends React.Component {


    state = {
        key:"",
        teacherid: "",
        classroomId: "",
        units: [],
        classroomName: "",
        newUnit:"",
        newStudent:"",
        currentUnit:"",
        currentUnitName:"",
        posts:[],
        notes:[],
        //actually static, used to display the content user wants easily
        mainOptions:[  "Posts", "Notes", "Students"
        ]
    }
    
    handleInputChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
      
    }
    //get request to retrieve session data 
    componentDidMount(){
        axios.get("/getsession").then(res=>{
            // console.log(res);
            //if there is a session
            if(res.data.user !==undefined){
                // console.log("loggedIn!");
                this.setState({
                    username: res.data.user.username,
                    teacherid: res.data.user._id, key: res.data.classroomInfo.classKey, classroomId:res.data.classroomInfo._id,classroomName:res.data.classroomInfo.className});
                this.getUnits()
               
              }
            //   redirect if user is not logged in
              else{
                //   console.log("not logged in");
                this.props.history.push("/teacherlogin");
              }

           
        }).catch(err=>{
           console.log(err);
           this.props.history.push("/teacherlogin");
        });
    }
    //gets the units using a get request
    getUnits=()=>{
        axios.get(`/${this.state.classroomId}/units`).then(res=>{

            //adds info for each unit
            this.setState({units:res.data});
        });
    }
    //temporary method to add a student, be mindful of hardcoded data 

    addStudent = ()=>{
        console.log(this.state.newStudent);
        axios.post(`/new/${this.state.classroomId}/student`, {name:this.state.newStudent,
         token: `t${Math.random()}`,
         email: "hello@hello.com",
         key: this.state.key
         
        }).then(res=>{
            console.log(res);
        }).catch(err=>{
            console.log(err);

        });
        
        
    
    }
    //click on unit sidebar to see its info and set current currentUnitId and currentUnitName
    selectUnit = (id, name)=>{
        console.log(`id: ${id} name: ${name}`);
        this.setState({currentUnit:id, currentUnitName: name});
    
    }
    //will show posts for current unit given current UnitID
    getPosts=()=>{
        axios.get(`/${this.state.currentUnit}/posts`).then(res=>{
            this.setState({posts:res.data});
            console.log(this.state.posts);
        });
         
    }
    getNotes=()=>{
        axios.get(`/${this.state.currentUnit}/notes`).then(res=>{
            this.setState({notes:res.data});
        })
    }


    //will make a post request to add a unit to the given classroom
     addUnit = (event)=>{
        // console.log(this.state.newUnit);
        axios.post(`new/${this.state.classroomId}/unit`,{name: this.state.newUnit}).then(res=>{
            // console.log(res);
            // console.log("added!");
            this.getUnits();
        }).catch(err=>{
            console.log(err);
        });

    }
    //logs out and redirects to landing page
    logout=()=>{
        axios.post("/logout",{}).then(res=>{
            console.log("logging out");
            this.props.history.push("/");
        }).catch(err=>{
            console.log(err);
        })
    }
    //grabs navbar click  
    infoChoice = (choice)=>{
        console.log(choice)
    }

    render(){
        return(
            <div>
                
                <TeacherSidebar selectUnit={this.selectUnit} id="newUnit" addUnit={this.addUnit} handleInputChange={this.handleInputChange}  units={this.state.units} />
                
                
                <TeacherUnitMain infoChoice={this.infoChoice}  
                logout={this.logout}
                options={this.state.mainOptions} 
                id={this.state.teacherid} 
                username={this.state.username} notes={this.state.notes} 
                posts={this.state.posts} 
                addStudent={this.addStudent} handleInputChange={this.handleInputChange} 
                units={this.state.units} />
               
            </div>
                
        
        );
    
    }
}

export default TeacherHomePage;