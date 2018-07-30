import React from 'react'
import axios, { post } from 'axios';

class StudentLogin extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      file:null
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
  }

  state ={
    doc: ""
  }
  onFormSubmit(e){
    e.preventDefault() // Stop form submit
    this.fileUpload(this.state.file).then((response)=>{
      console.log(response.data);
    })
  }

  componentDidMount(){
    axios.get("/mammoth").then( res =>{
      console.log(res);
      this.setState({doc: res.data})
    })
  }
  onChange(e) {
    this.setState({file:e.target.files[0]})
  }
  fileUpload(file){
    const url = '/uploading';
    const formData = new FormData();
    formData.append('p',file)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return  post(url, formData,config)
  }

  render() {
    return (

      <div>
        <div dangerouslySetInnerHTML={{ __html: this.state.doc }}></div>
      <form onSubmit={this.onFormSubmit}>
        <h1>File Upload</h1>
        <input type="file" onChange={this.onChange} />
        <button type="submit">Upload</button>
      </form>
      </div>


   )
  }
}



export default StudentLogin