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
                        <details key={k}>
                            <summary>{note.title}</summary>
                            <PDF id={note.id} name={"/" + note.title}/>
                        </details>
                    )
                }
                else{
                    return(
                        <details key={k}>
                            <summary>{note.title}</summary>
                            <Docx id={note.id} name={"/" + note.title} />
                        </details>
                    )
                }
                

                
            })
        }
        {/* <PDF id={props.notes[0].id} name={"/" +props.notes[0].title}/> */}
        </div>
    )
}

export default TeacherNote;