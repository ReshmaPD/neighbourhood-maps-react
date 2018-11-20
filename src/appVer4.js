import React, { Component } from "react";
// import logo from "./crystal-ball-logo.png";
// import ReactDOM from "react-dom";
// import PropTypes from "prop-types";
import ErrorBoundary from "./ErrorBoundary";
import "./App.css";
import GoogleMapsContainter from "./components/GoogleMapsContainer.js";
import locations from "./data/locations.json";

class App extends Component {
  state = {
    all: locations,
    zoom: 13,
    currentLocation: {
      lat: 29.787286,
      lng: -95.7948816
    }
  };

  componentDidMount() {
    window.gm_authFailure = () => {
      alert("authentification for google maps did not pass");
    };
  }

  // ...
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>My Maps Project</h1>
        </header>
        <ErrorBoundary>
          <GoogleMapsContainter
            // initialCenter={this.state.currentLocation}
            locations={this.state.all}
            // zoom={this.state.zoom}
          />
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
