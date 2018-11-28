import React from "react";
import PropTypes from "prop-types";
import sortBy from "sort-by";
import escapeRegExp from "escape-string-regexp";

const Filter = props => {
  const match = new RegExp(escapeRegExp(props.query), "i");
  return (
    <div className="map-sidebar" aria-label="List">
      <ul>
        {props.places2
          .filter(location => match.test(location.venue.name))
          .sort(sortBy("venue.name"))
          .map((location, index) => {
            return (
              <li
                className="list-item"
                tabIndex={0}
                key={index}
                onKeyPress={() => props.triggerMarkerClick(location.venue.id)}
                onClick={() => props.triggerMarkerClick(location.venue.id)}
              >
                {location.venue.name}
              </li>
            );
          })}
      </ul>
      {!props.filtered.length && props.query && (
        <ul>
          <li className="list-item">No Places Found..</li>
        </ul>
      )}
    </div>
  );
};

Filter.propTypes = {
  triggerMarkerClick: PropTypes.func.isRequired,
  places2: PropTypes.array.isRequired,
  filtered: PropTypes.array.isRequired,
  query: PropTypes.string
};

export default Filter;
