import React, { Component } from "react";
import { GoogleApiWrapper, InfoWindow, Map, Marker } from "google-maps-react";

// import PropTypes from "prop-types";
//eslint-disable-next-line
//eslint-disable-next-line no-unused-vars
const MAP_API_KEY = "AIzaSyBuOtZ4Xw9Wo4EK96HJ5Xmrs4Rz9sv5P1c";
// const places = this.props;

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
    // this.onMapClicked = this.onMapClicked.bind(this);
  }
  mapReady = (props, map) => {
    this.setState({ map });
  };
  // remove e from para
  onMarkerClick = (props, marker) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };
  onInfoWindowClose = () =>
    this.setState({
      activeMarker: null,
      showingInfoWindow: false
    });

  // remove e from props added()
  onMapClicked = () => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    // if (!this.props.loaded) return <div>Loading...</div>;
    const style = {
      width: "100%",
      height: "100vh",
      marginLeft: "auto",
      marginRight: "auto"
    };

    return (
      <Map
        className="map"
        role="application"
        aria-label="map"
        // onReady={this.mapReady()}
        // item
        // xs={12} //removed in MC
        style={style}
        google={this.props.google}
        onClick={this.onMapClicked} //removed in MC
        zoom={14}
        initalCenter={this.props.currentLocation}
      >
        {this.props.places.map((place, index) => (
          <Marker
            key={index}
            name={place.name}
            title={place.name}
            position={{ lat: place.latitude, lng: place.longitude }}
            onClick={this.onMarkerClick}
            // animation={
            //   this.state.activeMarker.name === place.name &&
            //   this.props.google.maps.Animation.BOUNCE
            // }
          />
        ))}

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
