import React from "react";
import PDF from "./PDF"
import Docx from "./Docx";
import Upload from "./Upload"

//Display all notes
const TeacherNote = (props) => {


    return (
        <div className='wrapper'>
        
        {/* For now assume only pdf notes */}
        <div className='row'>
            <div className='col-md-12'>
                <Upload unitId={props.unitId}/>
            </div>
        </div>
            <div className='row'>
                <div className='col-md-12'>
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
                </div>
            </div>
        {/* <PDF id={props.notes[0].id} name={"/" +props.notes[0].title}/> */}
        </div>
    )
}

export default TeacherNote;