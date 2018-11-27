import React, { Component } from "react";
import PropTypes from "prop-types";
import escapeRegExp from "escape-string-regexp";
import locations2 from "./data/newerPlaces3.json";
// =========================================================COMPONENTS============================================
import ErrorBoundary from "./components/ErrorBoundary";
import Map from "./components/Map";
import "./App.css";
// import "./MC.css";
import Sidebar from "./components/sidebar";
import Filter from "./components/Filter";
import Toggle from "./components/Toggle";

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
    zoom: 14,
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
      currentLocation: {
        lat: lat,
        lng: lng
      },
      map: "",
      query: "",
      infowindow: "",
      error: null,
      requestSolved: null,
      isLoading: true,
      loaded: false,
      places2: locations2,
      alllocations: locations2,
      allPlaces: [],
      places: [],
      markers: [],
      contents: [],
      filtered: [],
      hideMarkers: []
    };
  }

  componentDidMount() {
    this.getPlaces("sights");
  }

  getPlaces = query => {
    const endPoint = `https://api.foursquare.com/v2/venues/explore?`;
    const params = {
      client_id: `QV5MGPULNHAO5GRFVSWB04I023O4HYR1EQUKGDSL23F5NVZO`,
      client_secret: `4ETVXDDVKL0T0DASWLZK52052YDD04CNY0WUSHFQPBNTIWUI`,
      query: query,
      ll: `18.938792382629718,72.82594448102758`,
      v: `20181123`
    };
    // near: "mumbai",
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
        // this.getmap();
        if (this.state.requestSolved === true) {
          this.setState({ places2: this.state.places });
          console.log("I have setState ", this.state.places);
        }
        this.displayMap();
        // always executed
      });
  };

  // getmap = () => {
  //   this.displayMap();
  // };

  // ==============================================================================================================

  // =================================================MAP FUNCT=====================================================
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
    // mapview.style.height = window.innerHeight + "px";
    var map = new window.google.maps.Map(mapview, {
      center: { lat: lat, lng: lng },
      zoom: this.props.zoom,
      mapTypeId: "roadmap",
      mapTypeControl: false,
      streetViewControl: true,
      scroll: true
    });
    // ===============================================================================================================

    // =======================================================Markers=================================================
    const markers = [];
    const contents = [];
    const infowindow = new window.google.maps.InfoWindow();
    this.state.places2
      .filter(
        location => location.venue.name
        // .toLowerCase()
        // .includes(this.state.query.toLowerCase())
      )
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
          // position: location.pos,
          map: map,
          title: location.venue.name,
          id: location.venue.id,
          animation
        });
        // location.marker = marker;
        // location.display = true;
        markers.push(marker);
        contents.push(contentString);
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
            // map.setCenter(marker.position);
          }
        });
      });
    this.setState({ map, markers, infowindow, contents, loaded: true });
  }
  //===================================================================================================================
  handleFilter = query => {
    // set state of query, setting visibility of each marker
    //.trim() in setstae messes up the lsit and marker view
    this.setState({ query: query });
    this.state.markers.map(marker => marker.setVisible(true));
    // filter locations based on query, set state of filtered
    //don't implement this.state.query is truthy here IMP
    if (query) {
      const match = new RegExp(escapeRegExp(query), "i");
      const filtered = this.state.places2.filter(location =>
        match.test(location.venue.name)
      );
      // this.setState({ filtered });
      // hide markers that are not searched for and update its state
      const hideMarkers = this.state.markers.filter(marker =>
        filtered.every(
          filteredLocation => filteredLocation.venue.name !== marker.title
        )
      );
      hideMarkers.forEach(marker => marker.setVisible(false));
      // this.setState({ hideMarkers });
    } else {
      this.state.markers.forEach(marker => marker.setVisible(true));
    }
  };
  // ===================================================================================================================
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
    const {
      query,
      // map,
      markers,
      // contents,
      // infowindow,
      // filtered,
      // hideMarkers,
      places2
    } = this.state;
    return (
      <div className="container">
        {/* <main className="App"> */}
        <ErrorBoundary>
          <Toggle />
        </ErrorBoundary>
        <ErrorBoundary>
          <Sidebar value={query} handleFilter={this.handleFilter} />
        </ErrorBoundary>
        <ErrorBoundary>
          <Filter
            query={query}
            places2={places2}
            triggerMarkerClick={this.triggerMarkerClick}
            markers={markers}
          />
        </ErrorBoundary>
        {/* </main> */}
        <ErrorBoundary>
          <Map />
        </ErrorBoundary>
      </div>
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
  script.onerror = () => {
    document.write("Error loading Map, Please Try again in a few moments.");
  };
}
//=====================================================================================================================
export default App;
