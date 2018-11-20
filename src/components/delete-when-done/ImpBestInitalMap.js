import React, { Component } from "react";
import ErrorBoundary from "./ErrorBoundary";
import "./App.css";

class App extends Component {
  state = {
    map: "",
    all: null
  };

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
    var mapview = document.getElementById("map");
    mapview.style.height = window.innerHeight + "px";
    var map = new window.google.maps.Map(mapview, {
      center: { lat: 19.076, lng: 72.8777 },
      zoom: 12,
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
 * Resources [1]
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
