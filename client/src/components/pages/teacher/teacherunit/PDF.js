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
 
  onDocumentLoad = ({ numPages }) => {
    this.setState({ numPages });
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

  changePage = () =>{

  }

  star = () =>{
    var query_url = "/" + this.props.id + "/rating";
    axios.put(query_url, {studentid: this.props.userid}).then( result =>{
      console.log("After changing rating: note is: ");
      console.log(result.data);
      this.setState({
        rating: result.data.rating,
        hasVoted: true
      });

    })
  }
 
  render() {
    const { pageNumber, numPages } = this.state;
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
            Title: {this.props.name} <br />
            Rating: {this.state.rating}
        </summary>


          {/* <div style={this.divstyle}> */}
              <Document 
                file={this.state.docname}
              // file ={{data: this.state.doc}}
                onLoadSuccess={this.onDocumentLoad}
              >
                <Page  pageNumber={pageNumber} />
              </Document>
              <p>Page {pageNumber} of {numPages}</p>
            {starButton}
        {/* </div> */}
      </details>

      
    );
  }
}

export default PDF;