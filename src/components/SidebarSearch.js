import React from "react";
import PropTypes from "prop-types";

const SidebarSearch = props => {
  return (
    <div className="map-sidebar-search">
      <label htmlFor="searchPlaces">Find Places </label>
      <input
        autoFocus={true}
        type="text"
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

SidebarSearch.propTypes = {
  handleFilter: PropTypes.func.isRequired,
  query: PropTypes.string
};

export default SidebarSearch;
