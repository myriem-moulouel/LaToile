import React from "react";
import "./barreOption.css";

function barreOption({ active, text, Icon }) {
  return (
    <div className={`barreOption ${active && "barreOption--active"}`} >
      <Icon />
      <h2>{text}</h2>
    </div>
  );
}

export default barreOption;
