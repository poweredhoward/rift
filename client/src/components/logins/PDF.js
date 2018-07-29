import React, { Component } from 'react';
import { Document, Page, ReactPDF } from 'react-pdf';
import axios from "axios";

class PDF extends Component {
  state = {
    numPages: null,
    pageNumber: 1,
    doc : ""
  }

  divstyle = {
      height: "400",
      width: "300"

  }
 
  onDocumentLoad = ({ numPages }) => {
    this.setState({ numPages });
  }

  componentDidMount(){
      axios.get("/pdf").then(function(result){
          console.log("done with pdf get");
          console.log(result.data);
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
 
  render() {
    const { pageNumber, numPages } = this.state;
    // this.getpdf();
 
    return (
      <div style={this.divstyle}>
        <Document 
        //   file={"/cisco.pdf"}
        file ={{data: this.state.doc}}
          onLoadSuccess={this.onDocumentLoad}
        >
          <Page  pageNumber={pageNumber} />
        </Document>
        <p>Page {pageNumber} of {numPages}</p>
        
        {/* {this.state.doc} */}

        {/* <ReactPDF
            file={{
                data: this.state.doc
            }}
        /> */}
      </div>
    );
  }
}

export default PDF;