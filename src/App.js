import React, { Component } from "react";
import "./App.css";
import PropTypes from "prop-types";
import escapeRegExp from "escape-string-regexp";
import locations2 from "./data/Places3.json";
// =========================================================COMPONENTS============================================
import ErrorBoundary from "./components/ErrorBoundary";
import ToggleSidebar from "./components/ToggleSidebar";
import SidebarSearch from "./components/SidebarSearch";
import SidebarList from "./components/SidebarList";
import Map from "./components/Map";
// ================================================================================================================
const axios = require("axios");
class App extends Component {
  // ====================================================DEFAULT====================================================
  static propTypes = {
    google: PropTypes.object,
    zoom: PropTypes.number,
    initialCenter: PropTypes.object
  };

  static defaultProps = {
    zoom: 14,
    initialCenter: {
      lat: 18.938792382629718,
      lng: 72.82594448102758
    }
  };
  // =======================================================CONSTRUCTOR & STATE=======================================
  constructor(props) {
    super(props);
    const { lat, lng } = this.props.initialCenter;
    this.state = {
      currentLocation: {
        lat: lat,
        lng: lng
      },
      map: "",
      query: "",
      error: null,
      requestSolved: null,
      isLoading: true,
      loaded: false,
      places2: locations2,
      places: [],
      filtered: [],
      markers: []
    };
  }

  componentDidMount() {
    this.getPlaces("sights");
  }
  // ==============================================================================================================
  getPlaces = query => {
    const endPoint = `https://api.foursquare.com/v2/venues/explore?`;
    const params = {
      client_id: `QV5MGPULNHAO5GRFVSWB04I023O4HYR1EQUKGDSL23F5NVZO`,
      client_secret: `4ETVXDDVKL0T0DASWLZK52052YDD04CNY0WUSHFQPBNTIWUI`,
      query: query,
      ll: `18.938792382629718,72.82594448102758`,
      v: `20181123`
    };

    // Asynchronous API Requests
    axios
      .get(endPoint + new URLSearchParams(params))
      .then(response => {
        console.log(response);
        this.setState({
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
        if (this.state.requestSolved === true) {
          this.setState({ places2: this.state.places });
          console.log("I have setState ", this.state.places);
        }
        this.displayMap();
        // always executed
      });
  };

  // =================================================MAP FUNCT==========================================================
  displayMap = () => {
    const apiKey = `AIzaSyBuOtZ4Xw9Wo4EK96HJ5Xmrs4Rz9sv5P1c`;
    loadJS(
      `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`
    );
    window.initMap = this.initMap.bind(this);
  };
  // ======================================================MAP INIT=================================================
  initMap() {
    const { lat, lng } = this.state.currentLocation;
    const mapview = document.getElementById("map");
    const map = new window.google.maps.Map(mapview, {
      center: { lat: lat, lng: lng },
      zoom: this.props.zoom,
      mapTypeId: "roadmap",
      mapTypeControl: false,
      streetViewControl: true,
      scroll: true,
      gestureHandling: "cooperative"
    });
    // ===============================================================================================================

    // =======================================================MARKERS & INFOWINDOW=================================================
    const markers = [];
    const infowindow = new window.google.maps.InfoWindow();
    this.state.places2
      .filter(location => location.venue.name)
      .forEach(location => {
        //create content string for each info window

        const contentString =
          this.state.isLoading === false &&
          this.state.error === null &&
          this.state.requestSolved === true
            ? `<div class="info-content" tabIndex=0>
              <h1>${location.venue.name}</h1>
              <p>Address:${location.venue.location.formattedAddress[0]}
              ${location.venue.location.formattedAddress[1]}
              ${location.venue.location.formattedAddress[2]}</p>
              <p>lat: ${location.venue.location.lat.toFixed(2)},
              lng: ${location.venue.location.lng.toFixed(2)}</p>
              <h2>Powered By FourSquare</h2></div>
          `
            : `
              <div class="info-content" tabIndex=0>
              <h1>${location.venue.name}</h1>
              <h3>${"Sorry,Cannot get Data".toUpperCase()}</h3>
              <h2>Exceeded FourSquare API limit</h2></div>`;
        // create a marker for each location
        let animation = window.google.maps.Animation.DROP;
        let marker = new window.google.maps.Marker({
          position: new window.google.maps.LatLng(location.venue.location),
          map: map,
          title: location.venue.name,
          id: location.venue.id,
          animation
        });
        markers.push(marker);
        // set the info window content to location info and open on marker click
        marker.addListener("click", () => {
          infowindow.setContent(contentString);
          infowindow.open(map, marker);
          // animate the markers on click
          marker.setAnimation(window.google.maps.Animation.BOUNCE);
          setTimeout(() => {
            marker.setAnimation(null);
          }, 600);
        });
        // close info windows when map is clicked
        map.addListener("click", () => {
          if (infowindow) {
            infowindow.close();
          }
        });
      });
    this.setState({ map, markers, loaded: true });
  }
  //=============================================================event-handling======================================================
  handleFilter = query => {
    // set state of query, setting visibility of each marker

    this.setState({ query: query });
    this.state.markers.map(marker => marker.setVisible(true));
    // filter locations based on query, set state of filtered

    if (query) {
      const match = new RegExp(escapeRegExp(query), "i");
      const filtered = this.state.places2.filter(location =>
        match.test(location.venue.name)
      );
      this.setState({ filtered });
      // hide markers that are not searched for
      const hideMarkers = this.state.markers.filter(marker =>
        filtered.every(
          filteredLocation => filteredLocation.venue.id !== marker.id
        )
      );
      hideMarkers.forEach(marker => marker.setVisible(false));
    } else {
      this.state.markers.forEach(marker => marker.setVisible(true));
    }
  };
  // =============================================================event-handling======================================================
  triggerMarkerClick = placeid => {
    this.state.markers.map(marker => {
      if (marker.id === placeid) {
        window.google.maps.event.trigger(marker, "click");
      }
      return marker;
    });
  };
  //====================================================================================================================

  //=======================================================RENDER======================================================
  render() {
    const { query, places2, filtered } = this.state;
    return (
      <div className="container">
        <header>
          <ErrorBoundary>
            <ToggleSidebar />
          </ErrorBoundary>
        </header>
        <aside className="side">
          <ErrorBoundary>
            <SidebarSearch value={query} handleFilter={this.handleFilter} />
          </ErrorBoundary>
          <ErrorBoundary>
            <SidebarList
              query={query}
              places2={places2}
              triggerMarkerClick={this.triggerMarkerClick}
              filtered={filtered}
            />
          </ErrorBoundary>
        </aside>
        <main className="map-container">
          <ErrorBoundary>
            <Map />
          </ErrorBoundary>
        </main>
      </div>
    );
  }
}
//===========================================================END OF CLASS==============================================
//Load the google maps using script url- reference-Resources[1]
function loadJS(url) {
  let ref = window.document.getElementsByTagName("script")[0];
  let script = window.document.createElement("script");
  script.src = url;
  script.async = true;
  script.defer = true;
  ref.parentNode.insertBefore(script, ref);
  script.onerror = () => {
    document.write("Error loading Map, Please Try again in a few moments.");
  };
}
//=====================================================================================================================
export default App;
