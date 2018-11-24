import React, { Component } from "react";
import PropTypes from "prop-types";
// import locations from "./data/locations.json";
import locations2 from "./data/newPlaces2.json";
import axios from "axios";
// =========================================================COMPONENTS============================================
import ErrorBoundary from "../ErrorBoundary";
import Map from "../Map";
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
    zoom: 15,
    initialCenter: {
      lat: 18.938792382629718,
      lng: 72.82594448102758
    },
    alllocations: locations2
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
      markers: [],
      markerProp: [],
      allPlaces: [],
      places: [],
      isLoading: true,
      error: null,
      venueAll: [],
      venueId: null,
      infowindow: "",
      contents: []
    };
  }

  componentDidMount() {
    // this.displayMap();
    this.getPlaces("sights");
  }

  getPlaces = async query => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?";
    const params = {
      client_id: "QV5MGPULNHAO5GRFVSWB04I023O4HYR1EQUKGDSL23F5NVZO",
      client_secret: "4ETVXDDVKL0T0DASWLZK52052YDD04CNY0WUSHFQPBNTIWUI",
      query: query,
      near: "18.938792382629718,72.82594448102758",
      v: "20181123"
    };

    // Fetch
    // const fetchData = async () => {
    const response = await axios.get(endPoint + new URLSearchParams(params));
    try {
      this.setState(
        {
          allPlaces: response.data.response.groups[0].items,
          places: response.data.response.groups[0].items,
          isLoading: false
        },
        this.displayMap
      );
    } catch (error) {
      this.setState({ error: error, isLoading: false }, this.displayMap);
    }
  };
  // ==============================================================================================================
  // getID = () => {
  //   var venueId = this.state.allPlaces.map(function(venue) {
  //     return venue.venue;
  //   });
  //   console.log("finally", venueId);
  //   this.setState({ venuID: venueId });
  // };
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
    this.state.allPlaces
      .filter(location =>
        location.venue.name
          .toLowerCase()
          .includes(this.state.query.toLowerCase())
      )
      .forEach((location, index) => {
        //create content string for each info window

        const contentString =
          !this.state.isloading || this.state.error !== null
            ? `<h1>${location.venue.name}</h1>
              <p>Address: ${location.venue.location.formattedAddress[0]}
             ${location.venue.location.formattedAddress[1]}
              ${location.venue.location.formattedAddress[2]}</p>
              <p>lat: ${location.venue.location.lat},
               long: ${location.venue.location.lng}</p>
               <h2>Powered By FourSquare</h2>
          `
            : `
        <div class="info-content">
        <h2>${location.name}</h2>
        </div>
        <h3>Exceeded FourSquare API limit</h3>`;
        // create a marker for each location
        // let key;
        let animation = window.google.maps.Animation.DROP;
        let marker = new window.google.maps.Marker({
          position: new window.google.maps.LatLng(location.venue.location),
          // position: location.pos,
          map: map,
          title: location.name,
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
          }, 700);
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
