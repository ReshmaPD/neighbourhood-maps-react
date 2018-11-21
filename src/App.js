import React, { Component } from "react";
import PropTypes from "prop-types";
import locations from "./data/locations.json";
import ErrorBoundary from "./ErrorBoundary";
import Map from "./Map";
import "./App.css";

class App extends Component {
  static propTypes = {
    google: PropTypes.object,
    zoom: PropTypes.number,
    initialCenter: PropTypes.object
  };

  static defaultProps = {
    zoom: 13.5,
    initialCenter: {
      lat: 18.921984,
      lng: 72.834654
    }
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
      alllocations: locations,
      markers: [],
      markerProp: []
    };
  }

  componentDidMount() {
    this.displayMap();
  }

  displayMap = () => {
    const apiKey = "AIzaSyDNIiyRSDZFSZXoZz1lasmM-KOXnMIhgSQ";
    loadJS(
      `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`
    );
    window.initMap = this.initMap.bind(this);
  };

  initMap() {
    const { lat, lng } = this.state.currentLocation;
    const mapview = document.getElementById("map");
    // mapview.style.height = window.innerHeight + "px";
    var map = new window.google.maps.Map(mapview, {
      center: { lat: lat, lng: lng },
      zoom: this.props.zoom,
      // mapTypeId: "roadmap",
      mapTypeControl: false,
      streetViewControl: true
    });
    let markerProps = [];
    let markers = locations.map((location, index) => {
      let mProps = {
        key: index,
        index,
        name: location.name,
        position: location.location
      };
      markerProps.push(mProps);
      let animation = window.google.maps.Animation.DROP;
      let marker = new window.google.maps.Marker({
        position: location.location,
        map: map,
        animation
      });
      location.marker = marker;
      location.display = true;
      marker.addListener("click", () => {
        this.onMarkerClick(mProps, marker, null);
      });
      return marker;
    });
    this.setState({ markers, markerProps });

    this.setState({ map });
  }

  render() {
    return (
      <main className="App">
        <ErrorBoundary>
          <Map />
        </ErrorBoundary>
      </main>
    );
  }
}

/**
 * @param {url}Load the google maps using script url
 * reference-Resources [1]
 */
function loadJS(url) {
  let ref = window.document.getElementsByTagName("script")[0];
  let script = window.document.createElement("script");
  script.src = url;
  script.async = true;
  script.defer = true;
  ref.parentNode.insertBefore(script, ref);
  script.onerror = function() {
    document.write("Error loading Map. Please try again.");
  };
}

export default App;
