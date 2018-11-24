import React, { Component } from "react";
import PropTypes from "prop-types";
// import locations from "./data/locations.json";
// import locations2 from "./data/newPlaces2.json";
import locations2 from "./data/newerPlaces3.json";
// import axios from "axios";
// =========================================================COMPONENTS============================================
import ErrorBoundary from "./components/ErrorBoundary";
import Map from "./components/Map";
// import InfoWindow from "./components/InfoWindow";
import "./App.css";
// ================================================================================================================
const axios = require("axios");
class App extends Component {
  // ====================================================STATIC========================================================
  static propTypes = {
    google: PropTypes.object,
    zoom: PropTypes.number,
    initialCenter: PropTypes.object
  };

  static defaultProps = {
    zoom: 11.5,
    initialCenter: {
      lat: 18.938792382629718,
      lng: 72.82594448102758
    }
    // alllocations: locations2
  };
  // =======================================================CONSTRUCTOR STATE============================================
  constructor(props) {
    super(props);
    const { lat, lng } = this.props.initialCenter;
    this.state = {
      map: "",
      query: "",
      loaded: false,
      currentLocation: {
        lat: lat,
        lng: lng
      },
      alllocations: locations2,
      places2: locations2,
      markers: [],
      markerProp: [],
      allPlaces: [],
      places: [],
      isLoading: true,
      error: null,
      infowindow: "",
      contents: [],
      venue2: [],
      requestSolved: null
    };
  }

  componentDidMount() {
    // this.displayMap();
    this.getPlaces("sights");
  }

  getPlaces = query => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?";
    const params = {
      client_id: "QV5MGPULNHAO5GRFVSWB04I023O4HYR1EQUKGDSL23F5NVZO",
      client_secret: "4ETVXDDVKL0T0DASWLZK52052YDD04CNY0WUSHFQPBNTIWUI",
      query: query,
      near: "mumbai",
      v: "20181123"
    };

    // Fetch
    axios
      .get(endPoint + new URLSearchParams(params))
      .then(response => {
        console.log(response);
        this.setState({
          allPlaces: response.data.response.groups[0].items,
          places: response.data.response.groups[0].items,
          isLoading: false,
          requestSolved: true
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          error: error,
          isLoading: false,
          requestSolved: false
        });
      })
      .then(() => {
        this.getmap();
        if (this.state.requestSolved === true) {
          this.setState({ places2: this.state.places });
          console.log("I have setState ", this.state.places);
        }
        // always executed
      });
  };

  getmap = () => {
    this.displayMap();
  };

  // ==============================================================================================================

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
    const markers = [];
    const contents = [];
    let markerProps = [];
    const infowindow = new window.google.maps.InfoWindow();
    this.state.places2
      .filter(location =>
        location.venue.name
          .toLowerCase()
          .includes(this.state.query.toLowerCase())
      )
      .forEach((location, index) => {
        //create content string for each info window

        const contentString =
          this.state.isLoading === false &&
          this.state.error === null &&
          this.state.requestSolved === true
            ? `<h1>${location.venue.name}</h1>
             <p>Address:${location.venue.location.formattedAddress[0]}
             ${location.venue.location.formattedAddress[1]}
              ${location.venue.location.formattedAddress[2]}</p>
              <p>lat: ${location.venue.location.lat.toFixed(2)},
              lng: ${location.venue.location.lng.toFixed(2)}</p>
              <h2>Powered By FourSquare</h2>
          `
            : `
        <div class="info-content">
        <h2>${location.venue.name}</h2>
        <h4>Sorry,Cannot get Data</h4>
        </div>
        <h2>Exceeded FourSquare API limit</h2>`;
        // create a marker for each location
        // let key;
        let animation = window.google.maps.Animation.DROP;
        let marker = new window.google.maps.Marker({
          position: new window.google.maps.LatLng(location.venue.location),
          // position: location.pos,
          map: map,
          title: location.venue.name,
          animation
        });
        //DOG
        let mProps = {
          key: index,
          index,
          name: location.venue.name,
          position: location.venue.location
        };
        markerProps.push(mProps);
        location.marker = marker;
        location.display = true;
        markers.push(marker);
        contents.push(contentString);
        // set the info window content to location info and open on marker click
        marker.addListener("click", function() {
          infowindow.setContent(contentString);
          // this.infowindow.open(map,marker);
          infowindow.open(map, marker);
          // animate the markers on click
          marker.setAnimation(window.google.maps.Animation.BOUNCE);
          setTimeout(function() {
            marker.setAnimation(null);
          }, 850);
        });
        // close info windows when map is clicked
        map.addListener("click", function() {
          if (infowindow) {
            infowindow.close();
          }
        });
      });
    this.setState({ map, markers, infowindow, contents, loaded: true });
  }
  //===================================================================================================================

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
