import React, { Component } from "react";
import PropTypes from "prop-types";

class sidebar extends Component {
  static propTypes = {
    handleFilter: PropTypes.func.isRequired
  };
  //   constructor(props) {
  //     super(props);
  //     console.log(this);
  //     this.state = {
  //       query: ""
  //     };
  //   }

  render() {
    return (
      <div>
        <header className="header">
          <input
            type="text"
            placeholder="Search Places"
            className="search"
            onChange={event => this.props.handleFilter(event.target.value)}
            value={this.props.query}
            aria-label="Filter search input"
            tabIndex={0}
          />
          <h1 className="title">Map of Mumbai, IN </h1>
        </header>
      </div>
    );
  }
}

export default sidebar;
