// import React, { Component } from "react";

// class InfoWindow extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       done: []
//     };
//   }
//   renderMarker = () => {
//     const { map, places2, query, isLoading, requestSolved, error } = this.props;
//     const infowindow = new window.google.maps.InfoWindow();
//     places2
//       .filter(location =>
//         location.venue.name.toLowerCase().includes(query.toLowerCase())
//       )
//       .forEach((location, index) => {
//         //create content string for each info window
//         const markers = [];
//         const contents = [];
//         let markerProps = [];
//         const contentString =
//           isLoading === false && error === null && requestSolved === true
//             ? `<h1>${location.venue.name}</h1>
//               <p>Address: ${location.venue.location.formattedAddress[0]}
//              ${location.venue.location.formattedAddress[1]}
//               ${location.venue.location.formattedAddress[2]}</p>
//               <p>lat: ${location.venue.location.lat},
//                long: ${location.venue.location.lng}</p>
//                <h2>Powered By FourSquare</h2>
//           `
//             : `
//         <div class="info-content">
//         <h2>${location.venue.name}</h2>
//         <h4>Sorry,Cannot get Data</h4>
//         </div>
//         <h2>Exceeded FourSquare API limit</h2>`;
//         // create a marker for each location
//         // let key;
//         let animation = window.google.maps.Animation.DROP;
//         let marker = new window.google.maps.Marker({
//           position: new window.google.maps.LatLng(location.venue.location),
//           // position: location.pos,
//           map: map,
//           title: location.name,
//           animation
//         });
//         //DOG
//         let mProps = {
//           key: index,
//           index,
//           name: location.venue.name,
//           position: location.venue.location
//         };
//         markerProps.push(mProps);
//         location.marker = marker;
//         location.display = true;
//         markers.push(marker);
//         contents.push(contentString);
//         // set the info window content to location info and open on marker click
//         marker.addListener("click", function() {
//           infowindow.setContent(contentString);
//           // this.infowindow.open(map,marker);
//           infowindow.open(map, marker);
//           // animate the markers on click
//           marker.setAnimation(window.google.maps.Animation.BOUNCE);
//           setTimeout(function() {
//             marker.setAnimation(null);
//           }, 850);
//         });
//         // close info windows when map is clicked
//         map.addListener("click", function() {
//           if (infowindow) {
//             infowindow.close();
//           }
//         });
//       });
//   };

//   render() {
//     return <div />;
//   }
// }
// <InfoWindow
//   map={this.state.map}
//   places2={this.state.places2}
//   query={this.state.query}
//   isLoading={this.state.isLoading}
//   requestSolved={this.state.requestSolved}
//   error={this.state.error}
// />;

// export default InfoWindow;
if (this.state.requestSolved === null) {
  this.getmap();
}
getID = () => {
  if (this.state.error === null && !this.state.isloading) {
    var venueId = this.state.allPlaces.map(function(venue) {
      return venue.venue;
    });
    console.log("finally", venueId);
    console.log("finally2", this.state.allPlaces);
    // this.setState({ places2: venueId });
    // this.displayMap();
  } else {
    // this.displayMap();
    console.log("you bombed");
  }
};
AJAX error
if (
    this.state.requestSolved === null ||
    this.state.requestSolved === false
  ) {
    alert("Sorry Cannot Load Website ");
  }
  catch (error) {
    this.setState(
      { error: error, isLoading: false, requestSolved: false },
      this.displayMap
      // this.getmap
    );
    // return Promise.reject(error);
    return Promise.reject(error);
  }


  .catch(function onError(error) {
    if (error.status === 400) {
      console.log('Bad request, often due to missing a required parameter.');
    } else if (error.status === 401) {
      console.log('No valid API key provided.');
    } else if (error.status === 404) {
      console.log('The requested resource doesn\'t exist.');
    }
    this.setState(
        { error: error, isLoading: false, requestSolved: false },
        this.displayMap
        // this.getmap
      );
  });
  axios.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {
    // always executed
  });
  //===================================================


  axios.get(endPoint + new URLSearchParams(params));
  .then(function (response) {
    console.log(response);
    this.setState(
        {
          allPlaces: response.data.response.groups[0].items,
          places: response.data.response.groups[0].items,
          isLoading: false,
          requestSolved: true
        }
      );
  })
  .catch (error) {
    if (error.status === 400) {
      console.log("Bad request, often due to missing a required parameter.");
    } else if (error.status === 401) {
      console.log("No valid API key provided.");
    } else if (error.status === 404) {
      console.log("The requested resource doesn't exist.");
    }
    this.setState(
      { error: error, isLoading: false, requestSolved: false },
      // this.displayMap
      this.getmap
    );
  }
  .then(function () {
      this.getID()
    // always executed
  });


  const response = await axios.get(endPoint + new URLSearchParams(params));
  try {
    this.setState(
      {
        allPlaces: response.data.response.groups[0].items,
        places: response.data.response.groups[0].items,
        isLoading: false,
        requestSolved: true
      },
      this.getmap
      // this.displayMap
    );
  } catch (error) {
    if (error.status === 400) {
      console.log("Bad request, often due to missing a required parameter.");
    } else if (error.status === 401) {
      console.log("No valid API key provided.");
    } else if (error.status === 404) {
      console.log("The requested resource doesn't exist.");
    }
    this.setState(
      { error: error, isLoading: false, requestSolved: false },
      // this.displayMap
      this.getmap
    );
  }



  .then(function() {
    return this.displayMap();
    // this.getmap;
    // this.displayMap();
    // always executed
  });
  //
  axios.get('/user', {
    params: {
      ID: 12345
    }
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  })
  .then(function () {
    // always executed
  });
  //
      // Fetch
    // const fetchData = async () => {
        const response = await axios.get(endPoint + new URLSearchParams(params));
        try {
          this.setState(
            {
              allPlaces: response.data.response.groups[0].items,
              places: response.data.response.groups[0].items,
              isLoading: false,
              requestSolved: true
            },
            this.getmap
            // this.displayMap
          );
        } catch (error) {
          this.setState(
            { error: error, isLoading: false, requestSolved: false },
            this.displayMap
            // this.getmap
          );
          // return Promise.reject(error);
          return Promise.reject(error);
        }
        //
        axios.get('/user', {
            params: {
              ID: 12345
            }
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          })
          .then(function () {
            // always executed
          });


          axios.get(endPoint + new URLSearchParams(params))
          .then(function (response) {
            console.log(response);
            this.setState(
                {
                  allPlaces: response.data.response.groups[0].items,
                  places: response.data.response.groups[0].items
                }
              );
          })
          .catch(function (error) {
            console.log(error);
            this.setState(
                {
                  allPlaces: response.data.response.groups[0].items,
                  places: response.data.response.groups[0].items
                }
              );
          })
          .then(function () {
              this.displayMap,
            // always executed
          });