import React from "react";
import PropTypes from "prop-types";
import sortBy from "sort-by";
import escapeRegExp from "escape-string-regexp";

const Filter = props => {
  const match = new RegExp(escapeRegExp(props.query), "i");
  return (
    <div className="map-sidebar" aria-label="List">
      {/* <div className="content" aria-label="List"> */}
      <ul>
        {props.places2
          .filter(location => match.test(location.venue.name))
          .sort(sortBy("venue.name"))
          .map((location, index) => {
            return (
              <li
                className="list-item"
                key={index}
                onKeyPress={() => props.triggerMarkerClick(location.venue.id)}
                onClick={() => props.triggerMarkerClick(location.venue.id)}
                tabIndex={0}
              >
                {location.venue.name}
              </li>
            );
          })}
      </ul>
    </div>
  );
};

Filter.propTypes = {
  triggerMarkerClick: PropTypes.func.isRequired
};

export default Filter;
