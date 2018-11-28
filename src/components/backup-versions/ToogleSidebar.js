import React from "react";
import PropTypes from "prop-types";

const sidebar = props => {
  return (
    // <div className="map-sidebar">
    <div>
      <label htmlFor="searchQuery">Find A Place!</label>
      <input
        type="text"
        // id="searchQuery"
        placeholder="Search Places"
        className="sidebar-input"
        onChange={event => props.handleFilter(event.target.value)}
        value={props.query}
        aria-label="Filter search input"
        tabIndex={0}
      />
    </div>
  );
};

sidebar.propTypes = {
  handleFilter: PropTypes.func.isRequired
};

export default sidebar;
