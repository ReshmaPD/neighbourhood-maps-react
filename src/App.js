import React, { Component } from "react";
import PropTypes from "prop-types";
import ErrorBoundary from "./ErrorBoundary";
import "./App.css";
import locations from "./data/locations.json";

class App extends Component {
  static propTypes = {
    google: PropTypes.object,
    zoom: PropTypes.number,
    initialCenter: PropTypes.object
  };

  static defaultProps = {
    zoom: 13,
    initialCenter: {
      lat: 19.076,
      lng: 72.8777
    },
    allplaces: locations
  };

  constructor(props) {
    super(props);
    const { lat, lng } = this.props.initialCenter;
    this.state = {
      map: "",
      currentLocation: {
        lat: lat,
        lng: lng
      },
      all: null
    };
  }

  componentDidMount() {
    window.gm_authFailure = () => {
      alert("authentification for google maps did not pass");
    };
    this.displayMap();
  }

  displayMap = () => {
    const apiKey = "AIzaSyDNIiyRSDZFSZXoZz1lasmM-KOXnMIhgSQ";
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`
    );
    window.initMap = this.initMap.bind(this);
  };

  initMap() {
    const { lat, lng } = this.state.currentLocation;
    const mapview = document.getElementById("map");
    var map = new window.google.maps.Map(mapview, {
      center: { lat: lat, lng: lng },
      zoom: this.props.zoom,
      mapTypeId: "roadmap",
      mapTypeControl: false,
      streetViewControl: true
    });
    this.setState({ map });
  }

  render() {
    return (
      <main className="App">
        <ErrorBoundary>
          <div id="map" role="application" aria-label="map" />
        </ErrorBoundary>
      </main>
    );
  }
}

/**
 * @param {url}Load the google maps using script url
 * reference-Resources [1]
 */
function loadScript(url) {
  let index = window.document.getElementsByTagName("script")[0];
  let script = window.document.createElement("script");
  script.src = url;
  script.async = true;
  script.defer = true;
  index.parentNode.insertBefore(script, index);
  script.onerror = function() {
    document.write("Error loading Map. Please try again.");
  };
}

export default App;
