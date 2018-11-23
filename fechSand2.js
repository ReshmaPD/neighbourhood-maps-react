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