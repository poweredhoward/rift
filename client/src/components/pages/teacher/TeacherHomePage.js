import React from "react";
// import {Link} from "react-router-dom";
import TeacherSidebar from "./TeacherSidebar"
import TeacherUnitMain from "./teacherunit/TeacherUnitMain"
import axios from "axios";
// import { runInNewContext } from "vm";


class TeacherHomePage extends React.Component {


    state = {
        show: false, //modal show   
        posttitle: "", //title of new post 
        postbody: "", //body of neew post 
        students:[], //array of stidents in the classroom
        studentEmailInput:"",//track of student email similar to newStudent
        userType:"", //user type determines if info 
        newResponse:"", //field used to add a new response
        newPost:"", //field used to add a new post
        newNote:"", //field to post a new note
        key:"", //classroom key
        teacherid: "", //actually just a generic person id
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
        //default to show ~something~ in the homepage, can be changed
        currentChoice: "Posts"
    }

    showModal = () => {
        this.setState({ show: true });
    }

    hideModal = () => {
        this.setState({ 
            show: false,
            postbody: "",
            posttitle: "",
            
        });
       
    }

    handleSubmit = () => {
        if(this.state.postbody==="" || this.state.posttitle===""){
            alert("Please fill all fields!");
        }
        else{
              var dataObj = {
            title: this.state.posttitle,
            data: this.state.postbody
        }
        axios.post(`/new/${this.state.currentUnit}/post`, dataObj)
        this.updateDisplay(this.state.currentUnit);
        this.hideModal();

        }
      
      
        
    }

    
    handleInputChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
      
    }

    //get request to retrieve session data 
    componentDidMount(){
        axios.get("/getsession").then(res=>{
            console.log("Session data: ");
            // console.log(res);
            //if there is a session
            if(res.data.user !==undefined){
                // console.log("loggedIn!");
                // console.log(res.data.userType);
                this.setState({
                    userType:res.data.userType,
                    username: res.data.user.username ||res.data.user.name,
                    teacherid: res.data.user._id, 
                    key: res.data.classroomInfo.classKey,
                     classroomId:res.data.classroomInfo._id,
                     classroomName:res.data.classroomInfo.className});
                this.getUnits(res.data.classroomInfo._id)
                // this.getNotes(this.currentUnit)
                this.getStudents(res.data.classroomInfo._id);
                if(res.data.currentWindow!==undefined){
                    console.log("current window found!");
                    this.setState({
                        currentUnitName: res.data.currentWindow.unitName,
                        currentUnit:res.data.currentWindow.unit, 
                        currentChoice:res.data.currentWindow.currentChoice
                    });
                    this.selectUnit(res.data.currentWindow.unit, res.data.currentWindow.unitName);
                    this.infoChoice(res.data.currentWindow.currentChoice);

                }
               
              }
            //   redirect if user is not logged in
              else{
                //   console.log("not logged in");
                this.props.history.push("/");
              }

        //dealing with error that occurs each time you restart the server
        }).catch(err=>{
           console.log(err);
           this.props.history.push("/");
        });
    }

    //function adds current view to session so refresh doesnt change it
    setCurrentView = (id, name, choice )=>{
        // console.log("setting current view");
        axios.post(`/session/currentview`,
         {
          currentUnitName: name,
          currentUnit: id, 
          currentChoice: choice
        }).then(res=>{
            console.log("all good? check res below");
            // console.log(res);
        }).catch(err=>{
            console.log("ERROR: ");
            console.log(err);
        });
    }
   
   
    //click on unit sidebar to see its info and set current currentUnitId and currentUnitName
    
    selectUnit = (id, name)=>{//unit id and unit name
        // console.log(`id: ${id} name: ${name}`);
        this.setState({currentUnit:id, currentUnitName: name});
        this.getNotes(id);
        this.getPosts(id);
        this.setCurrentView(id, name, this.state.currentChoice);
        
    
    }

     //gets the units using a get request
     getUnits=(id)=>{
        axios.get(`/${id}/units`).then(res=>{

            //adds info for each unit
            if(res.data[0] !== undefined){
                // console.log(res.data[0])
                this.setState({
                    units:res.data 
                    // currentUnitName:res.data[0].name,
                    // currentUnit: res.data[0]._id
                });
            }
            
        }).catch(err=>{
            console.log(err)});
    }
    //will show posts for current unit given current UnitID
    getPosts=(id)=>{
        axios.get(`/${id}/posts`).then(res=>{
            this.setState({posts:res.data.reverse()});
            // console.log("these are all the posts with populated responses: ");
            // console.log(this.state.posts);
        });
         
    }
    getNotes=(id)=>{
        // console.log("Getting notes");
        axios.get(`/${id}/notes`).then(res=>{

            // console.log(res);
            this.setState({notes:res.data});
        })
    }
    //get student data for classroom
    getStudents = (id)=>{
        // console.log("get students ");
        axios.get(`${this.state.classroomId}/students`).then(res=>{
            // console.log(res);
            this.setState({students:res.data});
        }).catch(err=>{
            console.log(err);
        })
    }


    //function will add a random key to student
    makeToken = (len) => {
        // pool of possible letters and numbers
        let pool = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      
        // starting token string
        let str = "";
      
        // going up to the length (len), grab a random index from the pool and add it to the string
        for (let i = 0; i < len; i++) {
          str += pool.charAt(Math.floor(Math.random() * pool.length));
        }
      
        return str;
      }

     //temporary method to add a student, be mindful of hardcoded data 
     addStudent = ()=>{
         if(this.state.addStudent==="" || this.state.studentEmailInput===""){
             alert("Please fill all fields!");

         }
         else{
            console.log("adding student");

            console.log(this.state.newStudent);
            axios.post(`/new/${this.state.classroomId}/student`, {
            name:this.state.newStudent,
            //token created in the front instead of backend, shouldnt really make a difference
            token: `t${Math.random()}`,
            email: this.state.studentEmailInput,
            //should teacher make a key or be randomly be assigned, should it even be made in the front? 
            key: this.makeToken(6)
             
            }).then(res=>{
                console.log("add was probably successful, check response to be sure:");
                console.log(res);
                this.setState({
                    newStudent: ""
                });
                this.getStudents(this.state.classroomId);
                
            }).catch(err=>{
                console.log(err);
    
            });

         }
         
        
    }


    //will make a post request to add a unit to the given classroom
     addUnit = ()=>{
        // console.log(this.state.newUnit);
        if(this.state.newUnit===""){
            alert("Please name your new unit before adding it!");
        }
        else{
            axios.post(`new/${this.state.classroomId}/unit`,{name: this.state.newUnit}).then(res=>{
                // console.log(res);
                // console.log("added!");
                this.getUnits(this.state.classroomId);
    
                this.setState({
                    newUnit: ""
                })
            }).catch(err=>{
                console.log(err);
            });

        }
      

    }
    //will update display after a post or a response have been made
    updateDisplay(id){
        // this.selectUnit(this.state.currentUnit, this.state.currentUnitName);
        console.log("display updated");
        //refreshing unit to show updated information
        this.selectUnit(id, this.state.currentUnitName);

    }


    // //add a new post
    // addPost =() =>{
    //     if(this.state.newPost===""){
    //         alert("Please write a post before submitting!");
    //     }
    //     else{
    //         console.log("add post");
    //         console.log(this.state.newPost);
    //         axios.post(`/new/${this.state.currentUnit}/post`,{data: this.state.newPost}).then(res=>{
    //             console.log("note added");
    //             this.updateDisplay(this.state.currentUnit);
                
    //             this.setState({
    //                 newPost: ""
    //             })
    //         }).catch(err=>{
    //             console.log(err);
    //         });

    //     }
       
    // }

    //add a new response
    addResponse = (id)=>{
        if(this.state.newResponse===""){
            alert("Please write a response before submitting!");
        }
        else{
            // console.log(this.state.newResponse)
            axios.post(`new/${id}/response`,{data:this.state.newResponse}).then(res=>{
                console.log("response added");
                this.updateDisplay(this.state.currentUnit);
            }).catch(err=>{
                console.log(err);
            })

        }
       
    }

    //logs out and redirects to landing page
    logout=()=>{
        //post so session can be destroyed
        axios.post("/logout",{}).then(res=>{
            console.log("logging out");
            this.props.history.push("/");
        }).catch(err=>{
            console.log(err);
        })
    }
    //grabs navbar click, used to display the correct unit info

    infoChoice = (choice)=>{
        // console.log(choice);
        this.setState({currentChoice: choice});
        this.setCurrentView(this.state.currentUnit, this.state.currentUnitName,choice )
        
    }


    render(){
        return(
            <div className="main">
                
                <TeacherSidebar userType= {this.state.userType} selectUnit={this.selectUnit} id="newUnit" addUnit={this.addUnit} handleInputChange={this.handleInputChange}  units={this.state.units} inputvalue={this.state.newUnit} />
                
                
                <TeacherUnitMain
                students={this.state.students}
                userType= {this.state.userType}
                currentChoice = {this.state.currentChoice}
                infoChoice={this.infoChoice} 
                logout={this.logout}
                options={this.state.mainOptions} 
                unitId={this.state.currentUnit}
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
                inputvalue={this.state.newPost}
                newStudent={this.state.newStudent}
                updateDisplay={this.updateDisplay}
                show={this.state.show}
                posttitle={this.state.posttitle}
                postbody={this.state.postbody}
                showModal={this.showModal}
                hideModal={this.hideModal}
                handleSubmit={this.handleSubmit}
                />
        
               
            </div>
                
        
        );
    
    }
}
export default TeacherHomePage;