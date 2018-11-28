import React, { Component } from "react";
import "./App.css";
import PropTypes from "prop-types";
import escapeRegExp from "escape-string-regexp";
import locations2 from "./data/Places3.json";
// =========================================================COMPONENTS============================================================
import ErrorBoundary from "./components/ErrorBoundary";
import ToggleSidebar from "./components/ToggleSidebar";
import SidebarSearch from "./components/SidebarSearch";
import SidebarList from "./components/SidebarList";
import Map from "./components/Map";
const axios = require("axios");
class App extends Component {
  // ========================================================DEFAULT===============================================================
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
  // =====================================================CONSTRUCTOR & STATE=======================================================
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
  //good place to make api requests
  componentDidMount() {
    this.getPlaces("sights");
  }
  // ================================================================================================================================
  getPlaces = query => {
    const endPoint = `https://api.foursquare.com/v2/venues/explore?`;
    const params = {
      client_id: `QV5MGPULNHAO5GRFVSWB04I023O4HYR1EQUKGDSL23F5NVZO`,
      client_secret: `4ETVXDDVKL0T0DASWLZK52052YDD04CNY0WUSHFQPBNTIWUI`,
      query: query,
      ll: `18.938792382629718,72.82594448102758`,
      v: `20181123`
    };

    /**
     * Asynchronous API Requests are made such that we request for data using the above parameters, with the query and latlng set
     * if the request is succes we handle success by logging the response and from that get the data.response put that data in a state
     * also set state to indicate the request is solved and move to the callback, to get displaymap which is always exectued, even if we
     * get an error and our request is not a success, in that case we handle the error and updating the state of error to indicate failure
     * which is given the always executed callback which determines whether to change the state of our static json data
     */
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

  // ========================================================MAP FUNCT==================================================================
  // Connect the initMap() function within this class to the global window context,so Google Maps can invoke it
  // Asynchronously load the Google Maps script, passing in the callback reference
  displayMap = () => {
    const apiKey = `AIzaSyBuOtZ4Xw9Wo4EK96HJ5Xmrs4Rz9sv5P1c`;
    loadJS(
      `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`
    );
    window.initMap = this.initMap.bind(this);
  };
  // ========================================================MAP INIT=====================================================================
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

    // =======================================================MARKERS & INFOWINDOW====================================================
    const markers = [];
    const infowindow = new window.google.maps.InfoWindow();
    this.state.places2
      .filter(location => location.venue.name)
      .forEach(location => {
        /**
         *contentsrting creates content for infowindow based of of ternary, if the api request was success set the content based on
         *the content data from the api source while also giving the attribution, else if request fails, set the content with our data
         *containing the location venue name and also indicate that data was not fetched
         */

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
        // create a marker for each location given each marker an unquie id and title animate them when they are initally loaded on map
        let animation = window.google.maps.Animation.DROP;
        let marker = new window.google.maps.Marker({
          position: new window.google.maps.LatLng(location.venue.location),
          map: map,
          title: location.venue.name,
          id: location.venue.id,
          animation
        });
        markers.push(marker);
        //based on the contentstring set the infowindow content for each marker which can be opened when a marker is clicked
        marker.addListener("click", () => {
          infowindow.setContent(contentString);
          infowindow.open(map, marker);
          // markers are given an animation with a timeout
          marker.setAnimation(window.google.maps.Animation.BOUNCE);
          setTimeout(() => {
            marker.setAnimation(null);
          }, 600);
        });
        //when clicked on map, if any infowindow is open, close it
        map.addListener("click", () => {
          if (infowindow) {
            infowindow.close();
          }
        });
      });
    this.setState({ map, markers, loaded: true });
  }
  //=============================================================EVENT HANDLING======================================================
  /**
   *  handleEvent when a user searches for a place in the searchinput,set state of query,set visibility of each marker,filter locations
   *  based on query,keep this filtered location in state, if query matches with the location name the markers visibility is set to true
   *  else based on the filtered location if venue id does not match with that of marker id, the markers are hidden
   */

  handleFilter = query => {
    this.setState({ query: query });
    this.state.markers.map(marker => marker.setVisible(true));

    if (query) {
      const match = new RegExp(escapeRegExp(query), "i");
      const filtered = this.state.places2.filter(location =>
        match.test(location.venue.name)
      );
      this.setState({ filtered });
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

  /**
   * handleEvent when a user clicks through the list items,we map through the markers array state and if the markers id matches the venue id
   * clicked,it tiggers a marker click showing the infowindow content of that particular venue
   */
  triggerMarkerClick = placeId => {
    this.state.markers.map(marker => {
      if (marker.id === placeId) {
        window.google.maps.event.trigger(marker, "click");
      }
      return marker;
    });
  };

  //=======================================================RENDER======================================================================
  render() {
    const { query, places2, filtered } = this.state;
    return (
      <div className="container">
        <header>
          <ErrorBoundary>
            <ToggleSidebar />
          </ErrorBoundary>
        </header>
        <aside>
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
//===========================================================END OF CLASS===========================================================
//Load the google maps using script url- reference-Resources[1]
//If there is any error while loading the script, user is shown a message about it
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
//====================================================================================================================================
export default App;
