import React, { Component } from "react";
import { GoogleApiWrapper, InfoWindow, Map } from "google-maps-react";

const MAP_API_KEY = "AIzaSyDNIiyRSDZFSZXoZz1lasmM-KOXnMIhgSQ";

class GoogleMapsContainer extends Component {
  static defaultProps = {
    center: { lat: 16.50338, lng: 80.6455743 },
    zoom: 12
  };
  state = {
    map: null,
    markers: [],
    markerProp: [],
    activeMarker: null,
    activeMarkerProps: null,
    showingInfoWindow: false
  };

  mapReady = (props, map) => {
    this.setState({ map });
    this.updateMarkers(this.props.places);
  };
  closeInfoWindow = () => {
    this.state.activeMarker && this.setState.activeMarker.setAnimation(null);
    this.setState({
      showingInfoWindow: false,
      activeMarker: null,
      activeMarkerProps: null
    });
  };

  onMarkerClick = (props, marker, e) => {
    this.closeInfoWindow();
    this.setState({
      showingInfoWindow: true,
      activeMarker: marker,
      activeMarkerProps: props
    });
  };

  updateMarkers = locations => {
    if (!locations) return;
    this.state.markers.forEach(marker => marker.setMap(null));

    let markerProps = [];
    let markers = locations.map((location, index) => {
      let mProps = {
        key: index,
        index,
        name: location.name,
        position: location.pos
      };
      markerProps.push(mProps);
      let animation = this.props.google.maps.Animation.DROP;
      let marker = new this.props.google.maps.Marker({
        position: location.pos,
        map: this.state.map,
        animation
      });
      marker.addListener("click", () => {
        this.onMarkerClick(mProps, marker, null);
      });
      return marker;
    });
    this.setState({ markers, markerProps });
  };
  render() {
    // center ={this.props.currentLocation};
    const style = {
      width: "100%",
      height: "100vh",
      marginLeft: "auto",
      marginRight: "auto"
    };
    let amProps = this.state.activeMarkerProps;
    return (
      <Map
        className="map"
        defaultCenter={this.props.center}
        role="application"
        aria-label="map"
        onReady={this.mapReady}
        style={style}
        google={this.props.google}
        defaultzoom={this.props.zoom}
        // initalCenter={this.props.currentLocation}
      >
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.closeInfoWindow}
        >
          <div>
            <h3>{amProps && amProps.name}</h3>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: MAP_API_KEY
})(GoogleMapsContainer);
