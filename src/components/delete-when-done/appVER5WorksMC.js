import React, { Component } from "react";
import PropTypes from "prop-types";
import locations from "./data/locations.json";
// import axios from "axios";
import * as FourSquareAPI from "./data/FourSquareAPI2";
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
      // currentPlaces: [],
      venuID: [],
      // alllocations: locations,
      markers: [],
      markerProp: [],
      allPlaces: [],
      // places: [],
      isLoading: true,
      error: null,
      // places: [
      //   {
      //     name: "Prithvi Theatre",
      //     location: {
      //       lat: 19.106156,
      //       lng: 72.825809
      //     },
      //     img: "",
      //     likes: ""
      //   },
      //   {
      //     name: "Worli Sea Face",
      //     location: {
      //       lat: 19.009216,
      //       lng: 72.815022
      //     },
      //     img: "",
      //     likes: ""
      //   },
      //   {
      //     name: "Haji Ali Sea Face",
      //     location: {
      //       lat: 18.978995,
      //       lng: 72.811853
      //     },
      //     img: "",
      //     likes: ""
      //   },
      //   {
      //     name: "Bandstand Promenade",
      //     location: {
      //       lat: 19.04694,
      //       lng: 72.81991
      //     },
      //     img: "",
      //     likes: ""
      //   },
      //   {
      //     name: "Mahalaxmi Race Course",
      //     location: {
      //       lat: 18.98053,
      //       lng: 72.81858
      //     },
      //     img: "",
      //     likes: ""
      //   },
      //   {
      //     name: "Carter Road Promenade",
      //     location: {
      //       lat: 19.0672,
      //       lng: 72.8229
      //     },
      //     img: "",
      //     likes: ""
      //   }
      // ],
      places: require("./data/places.json"),
      currentPlaces: [],
      requestAvailable: true
    };
  }
  //=====================================================================================================================
  componentDidMount() {
    // this.getPlaces("sights", "mumbai");
    this.getFourSquareData();
    this.displayMap();
  }
  //=======================================================================================================================
  getFourSquareData = () => {
    const newPlaces = this.state.places.map(place => {
      const size = 150;
      FourSquareAPI.getFourSquareVenueID(
        place.location.lat,
        place.location.lng,
        place.name
      )
        .then(venueId => {
          FourSquareAPI.getFourSquareVenueInfo(venueId)
            .then(venueInfo => {
              place.likes = venueInfo.likes.count;
              place.img =
                venueInfo.bestPhoto.prefix + size + venueInfo.bestPhoto.suffix;
            })
            .catch(() => this.setState({ requestAvailable: false }));
        })
        .catch(e => alert(e));
      return place;
    });
    this.setState({ currentPlaces: newPlaces });
  };

  //====================================================================================================================
  // getPlaces = async (query, location) => {
  //   const endPoint = "https://api.foursquare.com/v2/venues/explore?";
  //   const params = {
  //     client_id: "MDZCTQDUG0TNYDYGOUFMGCKH322MHRGPKXKX4OVGMXFFKKFP",
  //     client_secret: "IE5OFGXC5N0ANX342UUEVJ0GWBO1WD1CGJFFJ3VVLN5XPAQC",
  //     query: query,
  //     near: location,
  //     v: "20182010"
  //   };

  //   // Fetch
  //   // const fetchData = async () => {
  //   const response = await axios.get(endPoint + new URLSearchParams(params));
  //   try {
  //     this.setState(
  //       {
  //         allPlaces: response.data.response.groups[0].items,
  //         places: response.data.response.groups[0].items,
  //         isLoading: false
  //       },
  //       this.getID
  //     );
  //     console.log("info", this.state.places);
  //   } catch (error) {
  //     this.setState({ error: error, isLoading: false }, this.getID);
  //   }
  // };
  //==============================================================NEW REQUEST=================================================
  // getID = () => {
  //   var officersIds = this.state.allPlaces.map(function(officer) {
  //     return officer.venue.id;
  //   });
  //   console.log("finally", officersIds);
  //   this.setState({ venuID: officersIds });
  // };
  //==========================================================================================================

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

    // ===========================================================MARKER CONTENT=============================================

    // let infowindow = new window.google.maps.InfoWindow();
    // this.state.places.map(place => {
    //   let content = `
    //                         <h1>${place.venue.name}</h1>
    //                         <p>Address: ${
    //                           place.venue.location.formattedAddress[0]
    //                         } ${place.venue.location.formattedAddress[1]} ${
    //     place.venue.location.formattedAddress[2]
    //   }</p>
    //                         <p>lat: ${place.venue.location.lat}, long: ${
    //     place.venue.location.lng
    //   }</p>
    //                         `;
    //   infowindow.setContent(content);
    //   return place;
    // });
    // =======================================================Markers=================================================
    let markerProps = [];
    let markers = this.props.alllocations.map((location, index) => {
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
      // marker.addListener("click", () => {
      //   this.onMarkerClick(mProps, marker);
      // });
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
