import axios from "axios";
//
export const getFourSquareVenueID = async (lat, lng, name) => {
  return await axios
    .get(
      `https://api.foursquare.com/v2/venues/search?client_id=MDZCTQDUG0TNYDYGOUFMGCKH322MHRGPKXKX4OVGMXFFKKFP&client_secret=IE5OFGXC5N0ANX342UUEVJ0GWBO1WD1CGJFFJ3VVLN5XPAQC&v=20182011&limit=1&ll=${lat},${lng}&query=${name}`
    )
    .then(response => response.data.response.venues[0].id);
};
//
export const getFourSquareVenueInfo = async venueId => {
  return await axios
    .get(
      `https://api.foursquare.com/v2/venues/${venueId}?client_id=MDZCTQDUG0TNYDYGOUFMGCKH322MHRGPKXKX4OVGMXFFKKFP&client_secret=IE5OFGXC5N0ANX342UUEVJ0GWBO1WD1CGJFFJ3VVLN5XPAQC&v=20182011`
    )
    .then(response => response.data.response.venue);




  getPlaces = async (query, location) => {
    const endPoint = "https://api.foursquare.com/v2/venues/search?";
    const params = {
      client_id: "MDZCTQDUG0TNYDYGOUFMGCKH322MHRGPKXKX4OVGMXFFKKFP",
      client_secret: "IE5OFGXC5N0ANX342UUEVJ0GWBO1WD1CGJFFJ3VVLN5XPAQC",
      v: "20182010"
      query: query,
      near: location,
    };
    &v=20182011&limit=1&ll=${lat},${lng}&query=${name}`



    const fetchData = async () => {
    const response = await axios.get(endPoint + new URLSearchParams(params));
    try {
      this.setState(
        {
          allPlaces: response.data.response.groups[0].items,
          places: response.data.response.groups[0].items,
          isLoading: false
        },
        this.getID
      );
      console.log("info", this.state.places);
    } catch (error) {
      this.setState({ error: error, isLoading: false }, this.getID);
    }
  };

  ,
  {
    "name": "Gateway of India",
    "id": 11,
    "location": {
      "lat": 18.921856,
      "lng": 72.834877
    },
    "address": "",
    "img": "",
    "likes": ""
  },
  {
    "name": "Jehangir Art Gallery",
    "id": 14,
    "location": {
      "lat": 18.9276,
      "lng": 72.83146
    },
    "address": "",
    "img": "",
    "likes": ""
  },
  {
    "name": "Wankhede Stadium",
    "id": 15,
    "location": {
      "lat": 18.9387,
      "lng": 72.8259
    },
    "address": "",
    "img": "",
    "likes": ""
  },
  {
    "name": "Marine Drive",
    "id": 16,
    "location": {
      "lat": 18.945239,
      "lng": 72.82515
    },
    "address": "",
    "img": "",
    "likes": ""
  },
  {
    "name": "Nariman Point",
    "id": 17,
    "location": {
      "lat": 18.9291,
      "lng": 72.8222
    },
    "address": "",
    "img": "",
    "likes": ""
  }