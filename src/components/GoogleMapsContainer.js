import React, { Component } from "react";
import { GoogleApiWrapper, InfoWindow, Map, Marker } from "google-maps-react";

//eslint-disable-next-line
// import Paper from 'material-ui/Paper';
// import Typography from 'material-ui/Typography';
// import { typography } from 'material-ui/styles';
//eslint-disable-next-line no-unused-vars
const MAP_API_KEY = "AIzaSyBuOtZ4Xw9Wo4EK96HJ5Xmrs4Rz9sv5P1c";

class GoogleMapsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    };
    // binding this to event-handler functions
    // this.onMarkerClick = this.onMarkerClick.bind(this);
    // this.onMapClick = this.onMapClick.bind(this);
  }
  // static defaultProps = {
  //   center: { lat: 30.4456494, lng: -97.6326804 }
  // };

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };

  onMapClick = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    const style = {
      width: "100%",
      height: "100vh",
      marginLeft: "auto",
      marginRight: "auto"
    };

    return (
      <Map
        role="application"
        aria-label="map"
        item
        xs={12} //removed in MC
        style={style}
        google={this.props.google}
        onClick={this.onMapClick} //removed in MC
        zoom={14}
        initialCenter={{ lat: 39.648209, lng: -75.711185 }}
      >
        <Marker
          // added animation place.mame this.pos lat lon MC
          onClick={this.onMarkerClick}
          title={"You Got this Ray"}
          position={{ lat: 39.648209, lng: -75.711185 }}
          name={"You Got this Ray"}
        />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
        >
          {/* Line 70 MC added  ternary operation to exceed forsqare limit */}
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: MAP_API_KEY
})(GoogleMapsContainer);