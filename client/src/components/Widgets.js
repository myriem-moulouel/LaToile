import React from "react";
import "../style/Widgets.css";
import {
  TwitterShareButton,
} from "react-twitter-embed";
import SearchIcon from "@material-ui/icons/Search";

function Widgets() {
  return (
    <div className="widgets" style={{ width: 300, minHeight: 100 }}>
      <div className="widgets__input">
        <SearchIcon className="widgets__searchIcon" />
        <input placeholder="Search Twitter" type="text" />
      </div>

      <div className="widgets__widgetContainer">
        <h3>Connect to your twitter count ;)</h3>

        <TwitterShareButton
          options={{ text: "#reactjs is awesome"}}
        />
      </div>
    </div>
  );
}

export default Widgets;
