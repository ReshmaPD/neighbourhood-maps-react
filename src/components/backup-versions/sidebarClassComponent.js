// import React, { Component } from "react";
// import PropTypes from "prop-types";

// class sidebar extends Component {
//   static propTypes = {
//     handleFilter: PropTypes.func.isRequired
// };
//   constructor(props) {
//     super(props);
//     console.log(this);
//     this.state = {
//       query: ""
//     };
//   }

//   render() {
//     return (
//       <div>
//         <header className="header">
//           <input
//             type="text"
//             placeholder="Search Places"
//             className="search"
//             onChange={event => this.props.handleFilter(event.target.value)}
//             value={this.props.query}
//             aria-label="Filter search input"
//             tabIndex={0}
//           />
//           <h1 className="title">Map of Mumbai, IN </h1>
//         </header>
//       </div>
//     );
//   }
// }

// export default sidebar;

//==============================================
// triggerMarkerClick = placeid => {
// const { infowindow, map, contents, markers } = this.props;
//   let marker = this.state.markers.filter(m => m.id === placeid)[0];
// this.infowindow.setContent(this.state.contents);
// window.google.map.setCenter(marker.position);
//   this.infowindow.open(this.map, marker);
// if(marker.getAnimation() !== null {marker.setAnimation(null)}
// else {marker.setAnimation(window.google.maps.Animation.BOUNCE);}
// setTimeout(()=>{marker.setAnimation(null)},1500);)
// };
// this.state.markers.map(marker => {
//   if (marker.id === placeid) {
//     window.google.maps.event.trigger(marker, "click");
//   }
//   return marker;
// });
// };
// triggerMarkerClick = placeid => {
//   this.state.markers
//     // .map(marker => marker.title.includes(!this.state.filtered))
//     .forEach(marker => {
//       if (marker.id === placeid) {
//         window.google.maps.event.trigger(marker, "click");
//       }
//       return marker;
//     });
// };
// triggerEvent = () => {
//   window.google.maps.event.trigger("click");
//   // this.infowindow.close();
//   // });
// };
//==================================================
