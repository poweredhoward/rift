import React, { Component } from 'react';
import { Document, Page, ReactPDF } from 'react-pdf';
import axios from "axios";

class PDF extends Component {
  state = {
    numPages: null,
    pageNumber: 1,
    doc : "",
    docname: "",
    rating: ""
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

    var query_url = "/" + this.props.id + "/pdf"
      axios.get(query_url).then(result =>{
          console.log("done with pdf get");
          // console.log(result.data);

          this.setState({docname: this.props.name});
    //       const file = new Blob(
    //           [Response.data],
    //           {type:'application/pdf'}
    //       );

    //       //Build a URL from the file
    // const fileURL = URL.createObjectURL(file);
    // //Open the URL on new Window
    //     window.open(fileURL);
          
    //       this.setState({doc: atob(result.data)})
    //     //   return result.data;
      })
  }

  changePage = () =>{

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
    const { pageNumber, numPages } = this.state;
    // this.getpdf();
 
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
              
            <button onClick={this.star}>Star</button>
        {/* </div> */}
      </details>

      
    );
  }
}

export default PDF;