// import * as FourSquareAPI FourSquareAPI from "./data/FourSquareAPI";

// getFourSquareData = () => {
//     const newPlaces = this.state.alllocations.map(place => {
//       const size = 150;
//       FourSquareAPI.getFourSquareVenueID(
//         place.pos.lat,
//         place.pos.lng,
//         place.name
//       )
//         .then(venueId => {
//           FourSquareAPI.getFourSquareVenueInfo(venueId)
//             .then(venueInfo => {
//               place.likes = venueInfo.likes.count;
//               place.img =
//                 venueInfo.bestPhoto.prefix + size + venueInfo.bestPhoto.suffix;
//             })
//             .catch(() => this.setState({ requestAvailable: false }));
//         })
//         .catch(e => alert(e));
//       return place;
//     });
//     this.setState({ currentPlaces: newPlaces });
//   };
