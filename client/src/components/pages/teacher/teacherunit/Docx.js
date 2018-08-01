import React, { Component } from 'react';
import axios from "axios";

class PDF extends Component {
  state = {
    docContent : "",
    rating: ""
  }

  componentDidMount(){
    this.setState({rating: this.props.rating});
    var query_url = "/" + this.props.id + "/mammoth"
      axios.get(query_url).then(result =>{
          console.log("done with docx get");
          // console.log(result.data);
          this.setState({docContent:result.data});
    
      })
  }
  
  star = () =>{
    var query_url = "/" + this.props.id + "/rating";
    axios.put(query_url).then( result =>{
      console.log("After changing rating: note is: ");
      console.log(result.data);
      this.setState({rating: result.data.rating});
      // window.location.reload();
      // this.props.updateDisplay();
    })
  }

  render() {

 
    return (
      <details>
        <summary>
            Title: {this.props.name} <br />
            Rating: {this.state.rating}
        </summary>
        <div dangerouslySetInnerHTML={{ __html: this.state.docContent }}></div>
        <button onClick={this.star}>Star</button>
      </details>
        
    );
  }
}

export default PDF;