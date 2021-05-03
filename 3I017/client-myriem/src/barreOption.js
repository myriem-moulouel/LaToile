import React from "react";
import "./barreOption.css";

function barreOption({ active, text, Icon, accede }) {
  return (
    <div className={`barreOption ${active && "barreOption--active"}`} >
      <Icon />
      <h2 onClick={accede}>{text}</h2>
    </div>
  );
}

export default barreOption;
