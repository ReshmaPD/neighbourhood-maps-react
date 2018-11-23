//Egypth========================================================================================
getPlaces = (query, location) => {
  const endPoint = "https://api.foursquare.com/v2/venues/explore?";
  const params = {
    client_id: "MDZCTQDUG0TNYDYGOUFMGCKH322MHRGPKXKX4OVGMXFFKKFP",
    client_secret: "IE5OFGXC5N0ANX342UUEVJ0GWBO1WD1CGJFFJ3VVLN5XPAQC",
    query: query,
    near: location,
    v: "20182010"
  };

  // Fetch
  axios.get(endPoint + new URLSearchParams(params)).then(response => {
    this.setState({
      allPlaces: response.data.response.groups[0].items,
      places: response.data.response.groups[0].items
    });
  });
};
//=============================================================================================

//MC============================================================================================
export const getFourSquareVenueID = (lat, lng, name) => {
  return fetch(`https://api.foursquare.com/v2/venues/search?
    client_id=X4CMVBAJQSVZYXB45ZGE3GNA43RTCMPQTM4PUIKMQHFYWUVX
    &client_secret=ODC00AI1UEPGLLYLVUOY1JM30NE1XADBZRJMUNXKXPSZKNTR
    &v=20180323&limit=1&ll=${lat},${lng}
    &query=${name}`)
    .then(response => response.json())
    .then(response => response.response.venues[0].id);
};

// Get venue info data using the venue's ID
export const getFourSquareVenueInfo = venueId => {
  return fetch(
    `https://api.foursquare.com/v2/venues/${venueId}?
    client_id=X4CMVBAJQSVZYXB45ZGE3GNA43RTCMPQTM4PUIKMQHFYWUVX
    &client_secret=ODC00AI1UEPGLLYLVUOY1JM30NE1XADBZRJMUNXKXPSZKNTR
    &v=20180323`
  )
    .then(response => response.json())
    .then(response => response.response.venue);
};
//==========================================================================================
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
//MC============================================================================================
//=================================================================
getResults = () => {
  let near = this.state.near;
  let limit = this.state.limit;
  let wish = this.state.wish;
  // console.log(wish);
  axios
    .get(
      API_DEFAULT +
        CLIENT +
        "&limit=" +
        limit +
        "&near=" +
        near +
        "&section=" +
        wish
    )
    .then(res => {
      let items = res.data.response.groups[0].items;
      // console.log(items);
      this.setState({
        list: items
        // ?????????
      });
    })
    .catch(err => {
      console.log(err);
    });
};
//=================================================================
