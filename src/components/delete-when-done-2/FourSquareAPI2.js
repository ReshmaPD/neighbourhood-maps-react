import axios from "axios";
//
export const getFourSquareVenueID = (lat, lng, name) => {
  return axios
    .get(
      `https://api.foursquare.com/v2/venues/search?client_id=X4CMVBAJQSVZYXB45ZGE3GNA43RTCMPQTM4PUIKMQHFYWUVX&client_secret=ODC00AI1UEPGLLYLVUOY1JM30NE1XADBZRJMUNXKXPSZKNTR&v=20180323&limit=1&ll=${lat},${lng}&query=${name}`
    )
    .then(response => response.data.response.venues[0].id);
};
//
export const getFourSquareVenueInfo = venueId => {
  return axios
    .get(
      `https://api.foursquare.com/v2/venues/${venueId}?client_id=X4CMVBAJQSVZYXB45ZGE3GNA43RTCMPQTM4PUIKMQHFYWUVX&client_secret=ODC00AI1UEPGLLYLVUOY1JM30NE1XADBZRJMUNXKXPSZKNTR&v=20180323`
    )
    .then(response => response.data.response.venue);
};