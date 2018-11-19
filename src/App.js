import React, { Component } from "react";
import logo from "./crystal-ball-logo.png";
import "./App.css";
import GoogleMapsContainter from "./components/GoogleMapsContainer.js";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>My Maps Project</h1>
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <GoogleMapsContainter />
      </div>
    );
  }
}

export default App;
