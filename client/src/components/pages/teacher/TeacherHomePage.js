import React from "react";
// import {Link} from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar"
import TeacherUnitMain from "./teacherunit/TeacherUnitMain"
import axios from "axios";
// import { runInNewContext } from "vm";


class TeacherHomePage extends React.Component {


    state = {
        newResponse:"", //field used to add a new response
        newPost:"", //field used to add a new post
        newNote:"", //field to post a new note
        key:"", //classroom key
        teacherid: "", 
        classroomId: "",
        units: [], //units added depending on unit
        classroomName: "", 
        newUnit:"", //space for new unit to be added 
        newStudent:"", //space for new student
        currentUnit:"", //unit id that has been clicked
        currentUnitName:"",
        posts:[],//posts for unit 
        notes:[],//notes for selecteed unit
        //actually static, used to display the content user wants easily
        mainOptions:[  "Posts", "Notes", "Students"
        ],
        currentChoice: "Posts"
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
   
   
    //click on unit sidebar to see its info and set current currentUnitId and currentUnitName
    selectUnit = (id, name)=>{
        console.log(`id: ${id} name: ${name}`);
        this.setState({currentUnit:id, currentUnitName: name});
        this.getNotes(id);
        this.getPosts(id);
    
    }

     //gets the units using a get request
     getUnits=()=>{
        axios.get(`/${this.state.classroomId}/units`).then(res=>{

            //adds info for each unit
            this.setState({units:res.data, currentUnitName:res.data[0].name});
        });
    }
    //will show posts for current unit given current UnitID
    getPosts=(id)=>{
        axios.get(`/${id}/posts`).then(res=>{
            this.setState({posts:res.data});
            console.log(this.state.posts);
        });
         
    }
    getNotes=(id)=>{
        console.log("Getting notes");
        axios.get(`/${id}/notes`).then(res=>{

            console.log(res);
            this.setState({notes:res.data});
        })
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


    //will make a post request to add a unit to the given classroom
     addUnit = ()=>{
        // console.log(this.state.newUnit);
        axios.post(`new/${this.state.classroomId}/unit`,{name: this.state.newUnit}).then(res=>{
            // console.log(res);
            // console.log("added!");
            this.getUnits();
        }).catch(err=>{
            console.log(err);
        });

    }
    //add a new note
    addNote(){
        console.log(this.state.newNote);

    }

    //add a new post
    addPost =() =>{
        console.log("add post");
        console.log(this.state.newPost);
        axios.post(`/new/${this.state.currentUnit}/post`,{data: this.state.newPost}).then(res=>{
            console.log("note added");
        }).catch(err=>{
            console.log(err);
        });
    }
    //add a new response
    addResponse = (id)=>{
        console.log(this.state.newResponse)
        axios.post(`new/${id}/response`).then(res=>{
            console.log("response added");
        }).catch(err=>{
            console.log(err);
        })
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
        console.log(choice);
        this.setState({currentChoice: choice});
        
    }

    render(){
        return(
            <div className="main">
                
                <TeacherSidebar selectUnit={this.selectUnit} id="newUnit" addUnit={this.addUnit} handleInputChange={this.handleInputChange}  units={this.state.units} />
                
                
                <TeacherUnitMain 
                currentChoice = {this.state.currentChoice}
                infoChoice={this.infoChoice} 
                logout={this.logout}
                options={this.state.mainOptions} 
                unitId={this.state.id}
                id={this.state.teacherid} 
                username={this.state.username}
                unitName={this.state.currentUnitName} 
                notes={this.state.notes} 
                posts={this.state.posts}
                addResponse={this.addResponse} 
                addPost={this.addPost}
                addStudent={this.addStudent} 
                handleInputChange={this.handleInputChange} 
                units={this.state.units} 
                getNotes={this.getNotes}
                />
               
            </div>
                
        
        );
    
    }
}
export default TeacherHomePage;