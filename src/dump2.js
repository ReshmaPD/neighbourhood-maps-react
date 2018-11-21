this.state.alllocations.forEach(function(location) {
  let marker = new window.google.maps.Marker({
    position: new window.google.maps.LatLng(
       lat: location.lat,
       lng: location.lng
         ),
    map: map,
    title: location.name,
    animation: window.google.maps.Animation.DROP
  });
  markers.push(marker);
});



position: { lat: lat, lng: lng },

let alllocations = [];
this.state.alllocations.forEach(function(location) {
  let marker = new window.google.maps.Marker({
    position: new window.google.maps.LatLng(
      location.lat,
      location.lng
    ),
    animation: window.google.maps.Animation.DROP,
    map: map
  });

  location.marker = marker;
  location.display = true;
  alllocations.push(location);
});
this.setState({
  alllocations: alllocations
});



//2
let alllocations = [];
this.state.alllocations.forEach(function(location) {
  let marker = new window.google.maps.Marker({
    position: new window.google.maps.LatLng(location.lng, location.lat),
    animation: window.google.maps.Animation.DROP,
    map: map
  });

  location.marker = marker;
  location.display = true;
  alllocations.push(location);
});

//3
var alllocations = [];
this.state.alllocations.forEach(function(location) {
  var longname = location.name + " - " + location.type;
  var marker = new window.google.maps.Marker({
    position: new window.google.maps.LatLng(
      location.latitude,
      location.longitude
    ),
    animation: window.google.maps.Animation.DROP,
    map: map
  });

  // marker.addListener("click", function() {
  //   self.openInfoWindow(marker);
  // });

  location.longname = longname;
  location.marker = marker;
  location.display = true;
  alllocations.push(location);
});
this.setState({
  alllocations: alllocations
});

let marker = new window.google.maps.Marker({
    position: new window.google.maps.LatLng({
      lat: 18.927456,
      lng: 72.831703
    }),
    map: map
  });