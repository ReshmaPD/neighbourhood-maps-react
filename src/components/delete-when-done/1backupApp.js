import React, { Component } from "react";
// import logo from "./crystal-ball-logo.png";
import ReactDOM from "react-dom";
import "./App.css";
import GoogleMapsContainter from "../GoogleMapsContainer.js";

class App extends Component {
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
  }
  componentDidMount() {
    this.loadMap();
  }

  // Ref -https://github.com/fullstackreact/google-maps-react
  loadMap() {
    if (this.props && this.props.google) {
      const { google } = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      let zoom = 14;
      let lat = 37.774929;
      let lng = -122.419416;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign(
        {},
        {
          center: center,
          zoom: zoom
        }
      );
      this.map = new maps.Map(node, mapConfig);
    }
  }
  // ...
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>My Maps Project</h1>
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
        </header>
        <div ref="map">
          <GoogleMapsContainter />
        </div>
      </div>
    );
  }
}

export default App;
