import React, { Component } from 'react';
import axios from "axios";

class PDF extends Component {
  state = {
    docContent : "",
  }

  componentDidMount(){
    var query_url = "/" + this.props.id + "/mammoth"
      axios.get(query_url).then(result =>{
          console.log("done with docx get");
          // console.log(result.data);
          this.setState({docContent:result.data});
    
      })
  }

  render() {

 
    return (
        <div dangerouslySetInnerHTML={{ __html: this.state.docContent }}></div>
    );
  }
}

export default PDF;