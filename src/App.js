import React, { Component } from "react";
import PropTypes from "prop-types";
import locations from "./data/locations.json";
// =========================================================COMPONENTS============================================
import ErrorBoundary from "./components/ErrorBoundary";
import Map from "./components/Map";
import "./App.css";
// ================================================================================================================
class App extends Component {
  // ====================================================STATIC========================================================
  static propTypes = {
    google: PropTypes.object,
    zoom: PropTypes.number,
    initialCenter: PropTypes.object
  };

  static defaultProps = {
    zoom: 12,
    initialCenter: {
      lat: 19.009216,
      lng: 72.815022
    },
    alllocations: locations
  };
  // =======================================================CONSTRUCTOR STATE============================================
  constructor(props) {
    super(props);
    const { lat, lng } = this.props.initialCenter;
    this.state = {
      map: "",
      loaded: false,
      currentLocation: {
        lat: lat,
        lng: lng
      },
      // alllocations: locations,
      markers: [],
      markerProp: []
    };
  }

  componentDidMount() {
    this.displayMap();
  }
  // =================================================MAP FUNCT=====================================================
  displayMap = () => {
    const apiKey = "AIzaSyDNIiyRSDZFSZXoZz1lasmM-KOXnMIhgSQ";
    loadJS(
      `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`
    );
    window.initMap = this.initMap.bind(this);
  };
  // ======================================================MAP INIT=================================================
  initMap() {
    const { lat, lng } = this.state.currentLocation;
    const mapview = document.getElementById("map");
    // mapview.style.height = window.innerHeight + "px";
    var map = new window.google.maps.Map(mapview, {
      center: { lat: lat, lng: lng },
      zoom: this.props.zoom,
      mapTypeId: "roadmap",
      mapTypeControl: false,
      streetViewControl: true
    });
    // ===============================================================================================================
    // =======================================================Markers=================================================
    let markerProps = [];
    let markers = locations.map((location, index) => {
      let mProps = {
        key: index,
        index,
        name: location.name,
        position: location.pos
      };
      markerProps.push(mProps);
      let animation = window.google.maps.Animation.DROP;
      let marker = new window.google.maps.Marker({
        position: new window.google.maps.LatLng(location.pos),
        // position: location.pos,
        map: map,
        title: location.name,
        animation
      });
      location.marker = marker;
      location.display = true;
      marker.addListener("click", () => {
        this.onMarkerClick(mProps, marker);
      });
      return marker;
    });
    this.setState({ markers, markerProps });
    // ===========================================================STATE================================================
    this.setState({ map, loaded: true });
  }
  //=======================================================RENDER======================================================
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
//===========================================================END OF CLASS==============================================
/**
 * @param {url}Load the google maps using script url
 * reference-Resources[1]
 */
function loadJS(url) {
  let ref = window.document.getElementsByTagName("script")[0];
  let script = window.document.createElement("script");
  script.src = url;
  script.async = true;
  script.defer = true;
  ref.parentNode.insertBefore(script, ref);
  script.onerror = function() {
    document.write("Error loading Map, Try again in a few moments.");
  };
}
//=====================================================================================================================
export default App;
