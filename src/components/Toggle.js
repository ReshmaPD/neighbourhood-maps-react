import React, { Component } from "react";

class Toggle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleOn: false
    };
  }
  // Toggle sidebar
  onClickToggle = () => {
    const sidebar = document.querySelector(".map-sidebar");
    const sidebar1 = document.querySelector(".map-sidebar-search");

    if (this.state.toggleOn) {
      sidebar.style.transform = "translateX(-350px)";
      sidebar1.style.transform = "translateX(-350px)";

      this.setState({ toggleOn: false });
    } else {
      sidebar.style.transform = "translateX(0px)";
      sidebar1.style.transform = "translateX(0px)";
      this.setState({ toggleOn: true });
    }
  };

  render() {
    return (
      <div className="map-nav-container">
        <nav className="map-nav">
          <button
            aria-label="Toggle Menu"
            tabIndex="0"
            className="toggle-menu fas fa-bars"
            onClick={this.onClickToggle}
          />
          <div className="nav-title">
            <h1>Mumbai India</h1>
          </div>
        </nav>
      </div>
    );
  }
}

export default Toggle;
