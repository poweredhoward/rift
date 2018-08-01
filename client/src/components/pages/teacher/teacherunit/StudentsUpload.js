import React from 'react'
import axios, { post } from 'axios';

class StudentsUpload extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      file:null
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
  }
  onFormSubmit(e){
    e.preventDefault() // Stop form submit
    this.fileUpload(this.state.file).then((response)=>{
      console.log(response.data);
      this.props.getStudents(this.props.classroomId);
    })
  }
  onChange(e) {
    this.setState({file:e.target.files[0]})
   
  }
  fileUpload(file){
    console.log(this.props.classroomId)
    const url = "/studentsfile/" + this.props.classroomId;
    const formData = new FormData();
    formData.append('file',file)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return  post(url, formData,config)
  }

  render()
  {
    var button = ""

    if(this.state.file!==null){
     button=  <button type="submit">Upload</button>

    }
    return (
      <form onSubmit={this.onFormSubmit}>
        <h3>File Upload</h3>
        <input type="file" onChange={this.onChange} />
        {button}
      </form>
   )
  }
}



export default StudentsUpload;