import React from "react";
import SearchBar from "../SearchBar";
import API from "../../utils/API";
import request from "request";
import axios from "axios";
import Results from "../Results";
import Saved from "../Saved";


class Main extends React.Component{
    state = {
        input_topic: "",
        input_start_year: "",
        input_end_year: "",
        articles: [],
        saved_articles: []

    }

    componentDidMount(){
        axios.get("/articles").then( result => {
            console.log(result.data);
            this.setState({saved_articles: result.data});
        })
    }

    handleInputChange = event =>{
        // console.log(event.target.value);
        this.setState({
            [event.target.name]: event.target.value
        });

        console.log(this.state);
    }

    submit = event =>{
        event.preventDefault();
        
            request.get ({
            url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
            qs: {
            'api-key': "ec9386b2270d431591c608dd2e1d96e9",
            'q': this.state.topic,
            'begin_date': this.state.start_year + "0629",
            'end_date': this.state.end_year + "0629"
            },
        }, (err, response, body) => {
            body = JSON.parse(body);
            console.log(body);
            var article_list = body.response.docs;
            this.setState({articles: article_list});

            
        })
    }

    deleteSaved = title =>{
        axios.delete("/articles").then(result =>{
            console.log(result);
            axios.get("/articles").then(r =>{
                console.log(r.data);
                this.setState({saved_articles : r.data});
            })
        });

    }

    save = params =>{
        console.log("params:");
        console.log(params);
       
        axios.post("/articles",{
            
                title: params.t,
                date: params.d,
                url: params.u,
                snippet: params.s
            }
        ).then(res => {
            console.log(res);
            // this.setState({articles: this.state.articles.push(res.data)})
            // window.location.reload();
        })

        
    }

    render(){
        console.log(this.state.articles);
        return(
            <div>
                <SearchBar onclick = {this.submit} onchange={this.handleInputChange} />

                <Results results={this.state.articles} savefunction={this.save}/>

                <Saved articles={this.state.saved_articles} click={this.deleteSaved} />
            </div>

            
        )
    }
}

export default Main;