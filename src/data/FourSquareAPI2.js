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
};
