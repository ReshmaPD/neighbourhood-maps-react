rebels() {
    const venueAll = this.state.allPlaces.filter(
      venue => venue.name === this.state.alllocations.name
    );
    this.setState({ venueAll: venueAll });
    console.log("venueAll", this.state.venueAll);
  }


  this.props.locations.filter(location => location.name.toLowerCase().includes(this.state.query.toLowerCase()))
  .forEach(location => {



    this.state.officerID.filter(location => location.name.includes(this.props.location.name));

    rebels() {
        const venueAll = this.state.officerID.filter(location => location.name.includes(this.props.location.name));
        this.setState({ venueAll: venueAll });
        console.log("venueAll", this.state.venueAll);
      }








      //=======================================================================================================================
        const markers = [];
        const contents = [];
        const infowindow = new window.google.maps.InfoWindow();
        this.props.alllocations.filter(location => location.name.toLowerCase().includes(this.state.query.toLowerCase())).forEach(location => {
            //create content string for each info window

            const contentString = (!isloading && error !== null ) ?
            `<h1>${place.venue.name}</h1>
                <p>Address: ${place.venue.location.formattedAddress[0]}
               ${place.venue.location.formattedAddress[1]}
                ${place.venue.location.formattedAddress[2]}</p>
                <p>lat: ${place.venue.location.lat},
                 long: ${place.venue.location.lng}</p>
            ` : `
            <div class="info-content">
            <h2>${location.name}</h2>
            </div>
            <h3>Exceeded FourSquare API limit</h3>`;
            // create a marker for each location
            let animation = window.google.maps.Animation.DROP;
            let marker = new window.google.maps.Marker({
              position: new window.google.maps.LatLng(location.location),
              // position: location.pos,
              map: map,
              title: location.name,
              animation
            });
            location.marker = marker;
            location.display = true;
            markers.push(marker);
            contents.push(contentString);
            // set the info window content to location info and open on marker click
            marker.addListener('click', function() {
                infowindow.setContent(contentString);
                infowindow.open(map, marker);
                // animate the markers on click
                marker.setAnimation(window.google.maps.Animation.BOUNCE)
                setTimeout(function() {
                    marker.setAnimation(null)
                }, 500);
            });
            // close info windows when map is clicked
            map.addListener('click', function() {
                if (infowindow) {
                    infowindow.close();
                }
            })
        });
        this.setState({ map, markers, infowindow, contents , loaded: true });

//=================================================================================================================
        { !this.props.requestAvailable ? (
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
              <h3>Exceeded FourSquare API limit</h3>
            </div>
          ) : (
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
              <img src={this.state.selectedPlace.img} alt={this.state.selectedPlace.name}/>
              <h3>Likes: {this.state.selectedPlace.likes}</h3>
            </div>
          )
        }


        const contentString = `
                <div class="info-content">
                    <h2>${location.name}</h2>
                </div>
            `;

            if(!this.state.error){

            }



            const contentString = (!isloading && error !== null ) ? `
            <h1>${place.venue.name}</h1>
            <p>Address: ${
              place.venue.location.formattedAddress[0]
            } ${place.venue.location.formattedAddress[1]} ${
place.venue.location.formattedAddress[2]
}</p>
            <p>lat: ${place.venue.location.lat}, long: ${
place.venue.location.lng
}</p>
            `; : `
            <div class="info-content">
                <h2>${location.name}</h2>
            </div>
        `;



        //below
        let markerProps = [];
        let markers = this.props.alllocations.map((location, index) => {
          let mProps = {
            key: index,
            index,
            name: location.name,
            position: location.location
          };
          markerProps.push(mProps);
          let animation = window.google.maps.Animation.DROP;
          let marker = new window.google.maps.Marker({
            position: new window.google.maps.LatLng(location.location),
            // position: location.pos,
            map: map,
            title: location.name,
            animation
          });
          location.marker = marker;
          location.display = true;
          marker.addListener("click", () => {
            this.onMarkerClick(mProps, marker);
          });
          return marker;
        });
        this.setState({ markers, markerProps });
        // ===========================================================STATE================================================
        this.setState({ map, loaded: true });
        //==================================================
        openInfoWindow = marker => {
            this.closeInfoWindow();
            this.state.infowindow.open(this.state.map, marker);
            marker.setAnimation(window.google.maps.Animation.BOUNCE);
            this.setState({
              prevmarker: marker
            });
            this.state.infowindow.setContent("Loading Data...");
            this.state.map.setCenter(marker.getPosition());
            this.state.map.panBy(0, -200);
            this.getMarkerInfo(marker);
          };



          this.state.places.map(place => {
            let content = `
            <h1>${place.venue.name}</h1>
            <p>Address: ${
              place.venue.location.formattedAddress[0]
            } ${place.venue.location.formattedAddress[1]} ${
place.venue.location.formattedAddress[2]
}</p>
            <p>lat: ${place.venue.location.lat}, long: ${
place.venue.location.lng
}</p>
            `;
}

this.state.places.map(place => {
    // Create Markers
    let marker = new window.google.maps.Marker({
      position: {
        lat: place.venue.location.lat,
        lng: place.venue.location.lng
      },
      map: map,
      animation: window.google.maps.Animation.DROP,
      title: place.venue.name
    });

    // Add each created marker to the 'markers' array
    this.state.markers.push(marker);

    // Create InfoWindow
    let content = `
                          <h1>${place.venue.name}</h1>
                          <p>Address: ${
                            place.venue.location.formattedAddress[0]
                          } ${place.venue.location.formattedAddress[1]} ${
      place.venue.location.formattedAddress[2]
    }</p>
                          <p>lat: ${place.venue.location.lat}, long: ${
      place.venue.location.lng
    }</p>
                          `;

    // Display the InfoWindow after clicking on the Marker
    marker.addListener("click", function() {
      // Update 'InfoWindow' content
      infowindow.setContent(content);

      // Open An 'InfoWindow'
      infowindow.open(map, marker);

      // Animate The Marker
      if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
      } else {
        marker.setAnimation(window.google.maps.Animation.BOUNCE);
      }
    });
  });
//=========================================================================================================
  // Display InfoWindow with marker data on click
  onMarkerClick = (props, marker) => {
    const place = this.props.places.filter((place) => place.name === props.title)
    this.setState({
      showingInfoWindow: true,
      activeMarker: marker,
      selectedPlace: place[0],
    });
  }

  {this.props.places.map((place, index) =>
    <Marker
      key={index}
      name={place.name}
      title={place.name}
      position={{lat: place.location.lat, lng: place.location.lng}}
      onClick={this.onMarkerClick}
      animation={this.state.activeMarker.name === place.name &&this.props.google.maps.Animation.BOUNCE}
    />
  )}