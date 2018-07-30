import React from "react";
import {Link, Route} from "react-router-dom";
import axios from "axios";
import TeacherHomePage from "./TeacherHomePage";


class TeacherClassSelect extends React.Component {

    state = {
        classrooms: [
        
        ],
        teacherid: "",
        classroomName: "hellotest"
    }//end of state



    componentDidMount(){
        axios.get("/getsession").then(res=>{
            // console.log(res);
            //if there is a session
            if(res.data.user !==undefined){
                // console.log("loggedIn!");
                this.setState({teacherid: res.data.user._id});
                this.getClassrooms();
              }
              //will redirect to teacherlogin if no teacher is logged in
              else{
                this.props.history.push("/teacherlogin");
              }

           
        }).catch(err=>{
            console.log(err);
            this.props.history.push("/teacherlogin");

        });
        
    }//end of fn 


    // Method for adding a classroom -- posts to mongoose and gets right after
    addClassroom = () => {
        var inputbox = this.refs.input;
        inputbox.value = ""
        var obj = {
            name: this.state.classroomName,
            key: Math.random()
        }
        axios.post(`/new/${this.state.teacherid}/classroom`, obj)
        .then((res) => {
            console.log("classroom has been added!");
            //getting classrooms
            this.getClassrooms();
            
        })
    }//end of fn

    handleInputChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }//end of fn
    
    //adds teacher's classrooms to state
    getClassrooms = () => {
        
        // Get request to teacher model to return list of classes
        axios.get(`/${this.state.teacherid}/classrooms`)
        .then((results) => {
            this.setState({
                classrooms : results.data
            });
            // console.log(this.state.classrooms);
        
        });
    }//end of fn

    //choose a classroom, data will be added to session thru post request
    chooseClassRoom = (className, classKey, _id)=>{
        // console.log(`className: ${className}, classKey: ${classKey}`);
        axios.post("/session/addclassroom", {className: className, classKey: classKey, _id: _id}).then(res=>{
            // console.log(res);
            // console.log("added");
            this.props.history.push("/teacherhomepage");
        }).catch(err=>{
            console.log(err);
        });

    }
  

    render(){
        return(
                // classroomid={item._id} key={item.key}
                <div className="classselect">
                    <h1>Select from your list of classes</h1>
                    <div className="container">

                    
                    {/* render a card for each classroom*/}
                    {this.state.classrooms.map(item => (
                        <div className="card" key={item.key} onClick={()=>{this.chooseClassRoom(item.name, item.key, item._id)}}>
                        <div className="card-body" >
                         <h6 className="card-subtitle mb-2 text-muted">{item.name}</h6>
                         <p className="card-text">Classroom Key: {item.key}</p>
                        </div>
                        </div>)     
                    )}
                    </div> {/*end of container*/}
                    <div className="classinput">
                        <input type="text" id="classroomName"
                        placeholder="Enter Class Name"
                        ref="input"
                        onChange={this.handleInputChange} 
                        />
                        <button
                        className="btn btn-primary"
                        onClick={this.addClassroom}>Add Classroom</button>
                    </div>
                    {/* <Route exact path="/teacherhomepage" component={TeacherHomePage} /> */}
                    <Route exact path="/teacherhomepage" render={props=><TeacherHomePage {...props} classroomName={this.classroomName} />} />
                    
                </div>    
        );//end of return 
    
        
    }//end of render
}//end of class
export default TeacherClassSelect;










        
