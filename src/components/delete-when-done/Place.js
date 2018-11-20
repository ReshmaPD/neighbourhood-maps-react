import React from "react";

function Place(props) {
  return (
    <li
      role="button"
      className="place"
      tabIndex="0"
      onKeyPress={props.openInfoWindow.bind(this, props.data.marker)}
      onClick={props.openInfoWindow.bind(this, props.data.marker)}
    >
      {props.data.longname}
    </li>
  );
}

export default Place;
