import React from "react";
import "../style/TweetBox.css";
import { Avatar, Button } from "@material-ui/core";

class TweetBox extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            login: this.props.login,
            tweetMessage: "",
            tweetImage: ""
        }
    }

     handleChangeM = event => {
        this.setState({ tweetMessage: event.target.value });
        console.log(`event.currentTarget.value`)
        console.log(`login depuis myacueil: ${this.state.login}`)
    };
    handleChangeI = event => {
        this.setState({ tweetImage: event.target.value });
        console.log(`event.currentTarget.value`)
        console.log(`login depuis myacueil: ${this.state.login}`)
    };
    submit = (e) => {
        e.preventDefault()
        console.log(`pseudo:${this.state.login}   tweetMessage:${this.state.tweetMessage} tweetImage=${this.state.tweetImage}`)
        this.props.addMessage(this.state.login,this.state.tweetMessage, this.state.tweetImage)

        console.log(`depuis myAccueil:  ${this.state.message}`)
        this.setState({
            tweetMessage: "",
            tweetImage: ""
        })
    }
  render(){
      return (
        <div className="tweetBox">
          <form>
            <div> 
              <h3>{this.state.login}</h3>
            </div>
            <div className="tweetBox__input">
              <Avatar src="https://cdn.w600.comps.canstockphoto.fr/mignon-cin%C3%A9ma-isolated-character-vecteurs-eps_csp51645538.jpg" />
              <textarea
                style={ {width:"341px", height:"64px"} }
                onChange={this.handleChangeM}
                value={this.state.tweetMessage}
                placeholder="What's happening?"
                type="text"
              />
            </div>
            <textarea
              value={this.state.tweetImage}
              onChange={this.handleChangeI}
              className="tweetBox__imageInput"
              placeholder="Optional: Enter image URL"
              type="text"
            />

            <Button
              onClick={this.submit}
              type="submit"
              className="tweetBox__tweetButton"
            >
              Tweet
            </Button>
          </form>
        </div>
      );
    }
}

export default TweetBox;
