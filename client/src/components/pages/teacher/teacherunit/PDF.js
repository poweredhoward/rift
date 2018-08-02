import React, { Component } from 'react';
import { Document, Page, ReactPDF } from 'react-pdf';
import axios from "axios";

class PDF extends Component {
  state = {
    numPages: null,
    pageNumber: 1,
    doc : "",
    docname: "",
    rating: "",
    hasVoted: ""
  }

  divstyle = {
      height: "400",
      width: "300"

  }
 
  
  componentDidMount(){
    this.setState({rating: this.props.rating});
    this.setState({hasVoted: this.props.hasVoted})

    var query_url = "/" + this.props.id + "/pdf"
      axios.get(query_url).then(result =>{
          console.log("done with pdf get");

          this.setState({
            docname: this.props.name
          });
          

      })
  }


  //When user stars a post
  star = () =>{
    var query_url = "/" + this.props.id + "/rating";
    axios.put(query_url, {studentid: this.props.userid}).then( result =>{
      console.log("After changing rating: note is: ");
      // console.log(result.data);
      this.setState({
        rating: result.data.rating,
        hasVoted: true
      });

    })
  }

  onDocumentLoad = ({ numPages }) => {
    this.setState({ numPages });
  }

  pageUp = () =>{
    var curr_num = this.state.pageNumber;
    curr_num += 1;
    this.setState({pageNumber: curr_num});
  }

  pageDown = () =>{
    var curr_num = this.state.pageNumber;
    curr_num -= 1;
    this.setState({pageNumber: curr_num});
  }

 
  render() {
    // var  pageNumber, numPages } = this.state;
    const numPages = this.state.numPages;
    
    
    //Whether or not to display voting button
    var starButton;
    if(this.state.hasVoted === true && this.props.userType === "student"){
      starButton = "";
    }
    else{
      starButton = <button onClick={this.star}>Star</button>
    }
 
    return (
      <details >
        <summary>
            Title: {this.props.name.substr(1)} <br />
            Rating: {this.state.rating}
        </summary>


          {/* <div style={this.divstyle}> */}
              <Document 
                file={this.state.docname}
              // file ={{data: this.state.doc}}
                onLoadSuccess={this.onDocumentLoad}
              >
                <Page  pageNumber={this.state.pageNumber} />
              </Document>
              <p>
                <button onClick={this.pageDown}>Page Down</button>
                Page {this.state.pageNumber} of {numPages}   
                <button onClick={this.pageUp}>Page Up</button>
              </p>
            {starButton}
            
            
        {/* </div> */}
      </details>

      
    );
  }
}

export default PDF;