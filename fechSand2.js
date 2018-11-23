const api = axios.create({
    baseURL: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/posts.json"
  });









  //
  //Egypth========================================================================================
  getVenueID = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/search?";
    const params = {
      client_id: "MDZCTQDUG0TNYDYGOUFMGCKH322MHRGPKXKX4OVGMXFFKKFP",
      client_secret: "IE5OFGXC5N0ANX342UUEVJ0GWBO1WD1CGJFFJ3VVLN5XPAQC",
      query: location.name,
      ll: location.pos,
      v: "20182010"
    };

    // Fetch
    axios.get(endPoint + new URLSearchParams(params)).then(response => {
      this.setState({
        allVenueID: response.data.response.venues[0].id,
      });
      console.log(response),
    });
  };

  //
  getFourSquareData = () => {
  const newPlaces = this.state.allocations.map(place => {
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
//

//
    export const getFourSquareVenueID = (lat, lng, name) => {
        return  axios.get(`https://api.foursquare.com/v2/venues/search?
          client_id=MDZCTQDUG0TNYDYGOUFMGCKH322MHRGPKXKX4OVGMXFFKKFP
          &client_secret=IE5OFGXC5N0ANX342UUEVJ0GWBO1WD1CGJFFJ3VVLN5XPAQC
          &v=20182011&limit=1&ll=${lat},${lng}
          &query=${name}`)
          .then(response => response.data.response.venues[0].id);
      };
 //
 export const getFourSquareVenueInfo = venueId => {
    return  axios.get(
      `https://api.foursquare.com/v2/venues/${venueId}?
      client_id=MDZCTQDUG0TNYDYGOUFMGCKH322MHRGPKXKX4OVGMXFFKKFP
      &client_secret=IE5OFGXC5N0ANX342UUEVJ0GWBO1WD1CGJFFJ3VVLN5XPAQC
      &v=20182011`
    )
    .then(response => response.data.response.venue);
  };


  async getPosts() {
    const response = await axios.get(endPoint + new URLSearchParams(params));
    try {
      this.setState({
        allPlaces: response.data.response.groups[0].items,
        places: response.data.response.groups[0].items,
        isLoading: false
      });
    } catch (error) {
      this.setState({ error, isLoading: false });
    }
  }
  GET https://api.foursquare.com/v2/venues/VENUE_ID











  //====================================================================================================================
  getFourSquareData = () => {
  const newPlaces = this.state.allocations.map(place => {
  export const getFourSquareVenueInfo = () => {
    return  axios.get(
      `https://api.foursquare.com/v2/venues/${places.venue.id}?
      client_id=MDZCTQDUG0TNYDYGOUFMGCKH322MHRGPKXKX4OVGMXFFKKFP
      &client_secret=IE5OFGXC5N0ANX342UUEVJ0GWBO1WD1CGJFFJ3VVLN5XPAQC
      &v=20182011`
    )
    .then(response => response.data.response.venue);
  };
  return place;
});
this.setState({ currentPlaces: newPlaces });
};


getVenuInfo = async (query, location) => {
    const endPoint = "https://api.foursquare.com/v2/venues/search?";
    const params = {
      client_id: "MDZCTQDUG0TNYDYGOUFMGCKH322MHRGPKXKX4OVGMXFFKKFP",
      client_secret: "IE5OFGXC5N0ANX342UUEVJ0GWBO1WD1CGJFFJ3VVLN5XPAQC",
      query: query,
      near: location,
      v: "20182010"
    };

    // Fetch
    // const fetchData = async () => {
    const response = await axios.get(endPoint + new URLSearchParams(params));
    try {
      this.setState({
        allPlaces: response.data.response.groups[0].items,
        places: response.data.response.groups[0].items,
        isLoading: false
      });
    } catch (error) {
      this.setState({ error: error, isLoading: false });
    }
  };
  //===========================================================2nd request==============================================
  getFourSquareData = () => {
    if (!this.state.isLoading) {
      const newPlaces = this.state.places.map(place => {
        // const getFourSquareVenueInfo = async () => {
        const response = axios.get(
          `https://api.foursquare.com/v2/venues/${this.state.places.venue.Id}?
        client_id=MDZCTQDUG0TNYDYGOUFMGCKH322MHRGPKXKX4OVGMXFFKKFP
        &client_secret=IE5OFGXC5N0ANX342UUEVJ0GWBO1WD1CGJFFJ3VVLN5XPAQC
        &v=20182011`
        );
        try {
          this.setState({
            allVenue: response.data.response.venue,
            isLoading: false
          });
        } catch (error) {
          this.setState({ error: error, isLoading: false });
        }
        return place;
        // }
      });
      this.setState({ currentPlaces: newPlaces });
    }
  };
//=================================================================================================================

getFourSquareData = () => {
    if (!this.state.isLoading) {
      const endPoint = "https://api.foursquare.com/v2/venues/";
      const params = {
        venueId: this.state.places.venue.id,
        client_id: "MDZCTQDUG0TNYDYGOUFMGCKH322MHRGPKXKX4OVGMXFFKKFP",
        client_secret: "IE5OFGXC5N0ANX342UUEVJ0GWBO1WD1CGJFFJ3VVLN5XPAQC",
        v: "20182010"
      };
      const newPlaces = this.state.places.map(place => {
        // let venueId = this.state.places.venue.id;
        // const getFourSquareVenueInfo = async () => {
        const response = axios.get(endPoint + new URLSearchParams(params));
        try {
          this.setState({
            allVenue: response.data.response.venue,
            isLoading: false
          });
        } catch (error) {
          this.setState({ error: error, isLoading: false });
        }
        return place;
        // }
      });
      this.setState({ currentPlaces: newPlaces });
    }
  };
  //======================================
  getFourSquareData = () => {
    if (!this.state.isLoading) {
      const endPoint = "https://api.foursquare.com/v2/venues/";
      const params = {
        venueId: this.state.venueID,
        client_id: "MDZCTQDUG0TNYDYGOUFMGCKH322MHRGPKXKX4OVGMXFFKKFP",
        client_secret: "IE5OFGXC5N0ANX342UUEVJ0GWBO1WD1CGJFFJ3VVLN5XPAQC",
        v: "20182010"
      };
      const newPlaces = this.state.places.map(place => {
        // let venueId = this.state.places.venue.id;
        // const getFourSquareVenueInfo = async () => {
        const response = axios.get(endPoint + new URLSearchParams(params));
        try {
          this.setState({
            allVenue: response.data.response.venue,
            isLoading: false
          });
        } catch (error) {
          this.setState({ error: error, isLoading: false });
        }
        return place;
        // }
      });
      this.setState({ currentPlaces: newPlaces });
    }
  };
  //
  getFourSquareData = () => {
    if (!this.state.isLoading) {
      const newPlaces = this.state.places.map(place => {
        // const getFourSquareVenueInfo = async () => {
        const response = axios.get(
          `https://api.foursquare.com/v2/venues/${this.state.venueID}?
        client_id=MDZCTQDUG0TNYDYGOUFMGCKH322MHRGPKXKX4OVGMXFFKKFP
        &client_secret=IE5OFGXC5N0ANX342UUEVJ0GWBO1WD1CGJFFJ3VVLN5XPAQC
        &v=20182011`
        );
        try {
          this.setState({
            allVenue: response.data.response.venue,
            isLoading: false
          });
        } catch (error) {
          this.setState({ error: error, isLoading: false });
        }
        return place;
        // }
      });
      this.setState({ currentPlaces: newPlaces });
    }
  };
  //========================================================MARKER==============================================
  let infowindow = new window.google.maps.InfoWindow();
    // Create InfoWindow
    this.state.places.map(place => {
      // Create Markers
      // let marker = new window.google.maps.Marker({
      //   position: {
      //     lat: place.venue.location.lat,
      //     lng: place.venue.location.lng
      //   },
      //   map: map,
      //   animation: window.google.maps.Animation.DROP,
      //   title: place.venue.name
      // });

      // Add each created marker to the 'markers' array
      // this.state.markers.push(marker);

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
      // marker.addListener("click", function() {
      // Update 'InfoWindow' content
      infowindow.setContent(content);

      // Open An 'InfoWindow'
      // infowindow.open(map, marker);

      // Animate The Marker
      // if (marker.getAnimation() !== null) {
      //   marker.setAnimation(null);
      // } else {
      //   marker.setAnimation(window.google.maps.Animation.BOUNCE);
      // }
      // });
      return place;
    });
    //==============================================================================================================
    // Get venue ID
export const getFourSquareVenueID = (lat, lng, name) => {
  return fetch(
    `https://api.foursquare.com/v2/venues/search?client_id=Q5MK2XFDK3FVTDQLOQKSFTKS1CI1XEWZSO2TIPP5DU2PWICK
    &client_secret=MQ3CZLR5KY1F04FUAX5YWXOLYRRJSYFWCHZANZZ23M4WI05L
    &v=20130815&limit=1
    &ll=${lat},${lng}
    &query=${name}`
  )
    .then(response => response.json())
    .then(response => response.response.venues[0].id);
};

// Get venue info data using the venue's ID
export const getFourSquareVenueInfo = venueId => {
  return fetch(
    `https://api.foursquare.com/v2/venues/${venueId}?
    client_id=Q5MK2XFDK3FVTDQLOQKSFTKS1CI1XEWZSO2TIPP5DU2PWICK
    &client_secret=MQ3CZLR5KY1F04FUAX5YWXOLYRRJSYFWCHZANZZ23M4WI05L
    &v=20130815`
  )
    .then(response => response.json())
    .then(response => response.response.venue);
};