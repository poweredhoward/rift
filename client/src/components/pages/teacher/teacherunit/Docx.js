import React, { Component } from 'react';
import axios from "axios";
import "../../css/docx.css";

class PDF extends Component {
  state = {
    docContent : "",
    rating: "",
    hasVoted: ""

  }

  starstyle = {
    color: "black",
    backgroundColor: "rgb(109, 109, 187)",
    width: "11%",
    fontWeight: "bold",
    fontSize: "120%",
    marginBottom: "15px",
    marginTop: "15px"
  }

  docstyle ={
    border: "none"
  }

headerstyle ={
    fontWeight: "bold",
    fontSize: "125%"
  }

  componentDidMount(){
    this.setState({rating: this.props.rating});
    this.setState({hasVoted: this.props.hasVoted})

    var query_url = "/" + this.props.id + "/mammoth"
      axios.get(query_url).then(result =>{
          console.log("done with docx get");
          // console.log(result.data);
          this.setState({docContent:result.data});
    
      })
  }
  
  //Runs when users star a note
  star = () =>{
    var query_url = "/" + this.props.id + "/rating";
    axios.put(query_url, {studentid: this.props.userid}).then( result =>{
      console.log("After changing rating: note is: ");
      // console.log(result.data);
      this.setState({
        rating: result.data.rating,
        hasVoted: true
      });
      // window.location.reload();
      // this.props.updateDisplay();
    })
  }

  render() {
    var starButton;
    if(this.state.hasVoted === true && this.props.userType === "student"){
      starButton = "";
    }
    else{
      starButton = <button className="btn btn-light btn-block" 
      style={this.starstyle} onClick={this.star}>Star</button>
    }

 
    return (
      <details>
        <summary style={this.headerstyle}>
            Title: {this.props.name.substr(1)} <br />
            Rating: {this.state.rating}
        </summary>
        <div className="doc" dangerouslySetInnerHTML={{ __html: this.state.docContent }}></div>
        {starButton}
        <br />
      </details>
        
    );
  }
}

export default PDF;