import React from "react";
import Modal from "./Modal";
import axios from "axios";

class Dashboard extends React.Component {
    state = {
        show: false,
        posttitle: "",
        postbody: ""
    }

    showModal = () => {
        this.setState({ show: true });
    }
      
    hideModal = () => {
        this.setState({ 
            show: false,
            postbody: "",
            posttitle: ""
        });
    }

    handleInputChange = (event) => {
        console.log("changed")
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = () => {
        var currentUnit = this.props.unitId
        var dataObj = {
            title: this.state.posttitle,
            data: this.state.postbody
        }
        axios.post(`/new/${currentUnit}/post`, dataObj)
        this.hideModal()
    }

    render(){
        return(
            <main>
                <Modal show={this.state.show} handleClose={this.hideModal} handleSubmit={this.handleSubmit} handleInputChange={this.handleInputChange} title={this.state.posttitle} body={this.state.postbody}>
                    <p>Modal</p>
                    <p>Data</p>
                </Modal>
                <button className='btn btn-dark btn-block' type='button' onClick={this.showModal}>Add Post</button>
            </main>
        )
    }

}

export default Dashboard;
