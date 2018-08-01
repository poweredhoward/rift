import React from "react";
import PDF from "./PDF"
import Docx from "./Docx";
import Upload from "./Upload"

const TeacherNote = (props) => {

    console.log("inside teacher note");

    return (
        <div>
        <h1>This is where all notes go</h1>
        {/* For now assume only pdf notes */}
        <div>
            <Upload unitId={props.unitId}/>
        </div>
        {
            props.notes.map(function(note, k){

                if(note.title.split(".")[1] === "pdf"){
                    return(
                        
                        <PDF 
                        hasVoted={
                            note.ratedBy.indexOf(props.id) !== -1 && props.userType === "student"
                        }
                        userType = {props.userType}
                        id={note.id}
                        userid={props.id}
                        name={"/" + note.title} 
                        key={k} 
                        rating={note.rating}/>
                        
                    )
                }
                else{
                    return(
                        
                        <Docx 
                        hasVoted={
                            note.ratedBy.indexOf(props.id) !== -1 && props.userType === "student"
                        }
                        userType = {props.userType}
                        userid={props.id}
                        id={note.id} 
                        name={"/" + note.title}  
                        key={k} 
                        rating={note.rating}/>
                        
                    )
                }
                

                
            })
        }
        {/* <PDF id={props.notes[0].id} name={"/" +props.notes[0].title}/> */}
        </div>
    )
}

export default TeacherNote;