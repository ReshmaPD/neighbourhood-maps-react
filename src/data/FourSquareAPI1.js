// Get venue ID
export const getFourSquareVenueID = (lat, lng, name) => {
  return fetch(
    `https://api.foursquare.com/v2/venues/search?
    client_id=MDZCTQDUG0TNYDYGOUFMGCKH322MHRGPKXKX4OVGMXFFKKFP
    &client_secret=IE5OFGXC5N0ANX342UUEVJ0GWBO1WD1CGJFFJ3VVLN5XPAQC
    &v=20181020
    &limit=1
    &ll=${lat},${lng}&query=${name}`
  )
    .then(response => response.json())
    .then(response => response.response.venues[0].id);
};

// Get venue info data using the venue's ID
export const getFourSquareVenueInfo = venueId => {
  return fetch(
    `https://api.foursquare.com/v2/venues/${venueId}?client_id=MDZCTQDUG0TNYDYGOUFMGCKH322MHRGPKXKX4OVGMXFFKKFP
    &client_secret=IE5OFGXC5N0ANX342UUEVJ0GWBO1WD1CGJFFJ3VVLN5XPAQC&v=20181020`
  )
    .then(response => response.json())
    .then(response => response.response.venue);
};
