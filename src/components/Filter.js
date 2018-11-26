import React, { Component } from "react";
// import sortBy from "sort-by";
import escapeRegExp from "escape-string-regexp";
// .sort(sortBy("title"))
class Filter extends Component {
  handleClicks = location => {
    const { infowindow, map, contents, markers } = this.props;
    // filter the markers that match the specific location name then onClick show info window
    markers
      .filter(marker => marker.title === location.venue.name)
      .forEach(marker => {
        infowindow.setContent(
          String(
            contents.filter(content =>
              String(content)
                .slice(8)
                .includes(location.venue.name)
            )
          )
        );
        infowindow.open(map, marker);
        // set bounce animation for the marker that is clicked
        marker.setAnimation(window.google.maps.Animation.BOUNCE);
        setTimeout(function() {
          marker.setAnimation(null);
        }, 500);
      });
  };
  // .sort(sortBy("title"))
  //   this.state.places2.filter(location =>
  //     match.test(location.venue.name.trim())
  //   );
  render() {
    const { places2, query } = this.props;
    const match = new RegExp(escapeRegExp(query), "i");
    return (
      <div className="content" aria-label="List">
        <ul>
          {places2
            .filter(location => match.test(location.venue.name))
            .map((location, index) => {
              return (
                <li
                  className="list-item"
                  key={index}
                  onClick={this.handleClicks}
                  tabIndex={0}
                >
                  {location.venue.name}
                </li>
              );
            })}
        </ul>
      </div>
    );
  }
}

export default Filter;
