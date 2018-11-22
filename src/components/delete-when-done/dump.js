import React, { Component } from "react";
// import logo from "./crystal-ball-logo.png";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import ErrorBoundary from "./ErrorBoundary";
import "./App.css";
import GoogleMapsContainter from "./components/GoogleMapsContainer.js";
import places from "./data/places.json";

class App extends Component {
  static propTypes = {
    google: PropTypes.object,
    zoom: PropTypes.number,
    initialCenter: PropTypes.object
  };

  static defaultProps = {
    zoom: 13,
    initialCenter: {
      lat: 16.50338,
      lng: 80.6455743
    }
  };
  constructor(props) {
    super(props);

    const { lat, lng } = this.props.initialCenter;
    this.state = {
      places: places,
      currentLocation: {
        lat: lat,
        lng: lng
      }
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
  }
  componentDidMount() {
    window.gm_authFailure = () => {
      alert("authentification for google maps did not pass");
    };
    this.loadMap();
  }

  // Ref -https://github.com/fullstackreact/google-maps-react
  loadMap() {
    if (this.props && this.props.google) {
      const { google } = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      let { zoom } = this.props;
      // const { lat, lng } = initialCenter;
      const { lat, lng } = this.state.currentLocation;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign(
        {},
        {
          center: center,
          zoom: zoom
        }
      );
      this.map = new maps.Map(node, mapConfig);
    }
    // ...
  }

  // ...
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>My Maps Project</h1>
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
        </header>
        <ErrorBoundary>
          <div ref="map">
            <GoogleMapsContainter
              initialCenter={this.state.currentLocation}
              places={this.state.places}
            />
          </div>
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;

// onMarkerClick = (props, marker) => {
// const place = this.props.places.filter((place) => place.name === props.title)
// this.setState({
//   showingInfoWindow: true,
//   activeMarker: marker
// selectedPlace: place[0],
// });
//   };

//   {this.props.places.map((place, index) => (
//     <Marker
//       key={index}
//       name={place.name}
//       title={place.name}
//       position={{ lat: place.latitude, lng: place.longitude }}
//       onClick={this.onMarkerClick}
//     />
//   ))}

// constructor(props) {
//   super(props);
//   this.state = {
//     map: "",
//     all: null
//   };
// }
/**
 * {
​​​​"name":"Prithvi Theatre",
"id":1,
​​​​​"address":"Church Road (Juhu) Mumbai 400049 Maharashtra India",
"pos": {
"lat": 19.106156977247707,
"lng": 72.82580993416029
        },
"postalCode":400049
},

{
    ​​​​"name":"Worli Sea Face",
    "id":2,
    ​​​​​"address":"Worli (Khan Abdul Gaffar Khan Road), Mumbai 400018 Maharashtra India",
    "pos": {
    "lat":19.009216497075652,
    "lng": 72.8150224685669
    },
    "postalCode":400049
    },
 */
