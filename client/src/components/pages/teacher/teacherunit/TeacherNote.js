import React from "react";
import PDF from "./PDF"

const TeacherNote = (props) => {
    props.getNotes(props.id);
    console.log("inside teacher note");

    return (
        <div>
        <h1>This is where all notes go</h1>
        {/* For now assume only pdf notes */}
        {
            props.notes.map(function(note, k){
                return(
                    <div key={k}>
                        Note: {note.title}
                        {/* <PDF id={note.id} name={"/" + note.title}/> */}
                    </div>
                )
            })
        }
        <PDF id={props.notes[0].id} name={"/" +props.notes[0].title}/>
        </div>
    )
}

export default TeacherNote;