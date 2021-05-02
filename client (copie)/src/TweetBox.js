import React, { useState } from "react";
import "./TweetBox.css";
import { Avatar, Button } from "@material-ui/core";
import db from "./firebase";

function TweetBox( {lastname, firstname, login}) {
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImage, setTweetImage] = useState("");

  const sendTweet = (e) => {
    e.preventDefault();

    db.collection("posts").add({
      lastname: {lastname},
      firstname: {firstname},
      verified: true,
      text: tweetMessage,
      image: tweetImage,
      avatar:
        "https://cdn.w600.comps.canstockphoto.fr/mignon-cin%C3%A9ma-isolated-character-vecteurs-eps_csp51645538.jpg",
    });

    setTweetMessage("");
    setTweetImage("");
  };

  return (
    <div className="tweetBox">
      <form>
        <div> 
          <h3> {firstname} {lastname} {login}</h3>
        </div>
        <div className="tweetBox__input">
          <Avatar src="https://cdn.w600.comps.canstockphoto.fr/mignon-cin%C3%A9ma-isolated-character-vecteurs-eps_csp51645538.jpg" />
          <textarea
            style={ {width:"341px", height:"64px"} }
            onChange={(e) => setTweetMessage(e.target.value)}
            value={tweetMessage}
            placeholder="What's happening?"
            type="text"
          />
        </div>
        <textarea
          value={tweetImage}
          onChange={(e) => setTweetImage(e.target.value)}
          className="tweetBox__imageInput"
          placeholder="Optional: Enter image URL"
          type="text"
        />

        <Button
          onClick={sendTweet}
          type="submit"
          className="tweetBox__tweetButton"
        >
          Tweet
        </Button>
      </form>
    </div>
  );
}

export default TweetBox;
