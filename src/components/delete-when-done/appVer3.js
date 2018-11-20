import React, { Component } from "react";
// import logo from "./crystal-ball-logo.png";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import "./App.css";
import GoogleMapsContainter from "../GoogleMapsContainer.js";
import places from "./components/places.json";

class App extends Component {
  static propTypes = {
    google: PropTypes.object,
    zoom: PropTypes.number,
    initialCenter: PropTypes.object
  };

  static defaultProps = {
    zoom: 13,
    initialCenter: {
      lat: 30.4456494,
      lng: -97.6326804
    }
  };
  constructor(props) {
    super(props);

    const { lat, lng } = this.props.initialCenter;
    this.state = {
      currentLocation: {
        lat: lat,
        lng: lng
      },
      alllocation: places
    };
  }

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

      let { zoom } = this.props;
      // const { lat, lng } = initialCenter;
      const { lat, lng } = this.state.currentLocation;
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
    // ...
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
          <GoogleMapsContainter
            initialCenter={this.state.currentLocation}
            alllocation={this.state.alllocation}
          />
        </div>
      </div>
    );
  }
}

export default App;
