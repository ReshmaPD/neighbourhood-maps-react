import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      errorInfo: null
    };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any child components
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.error) {
      // Fallback UI if an error occurs
      return (
        <div className="red">
          <h2>{"Oh-no! Something went wrong"}</h2>
          <p>
            {
              "The site could be temporarily unavailable or too busy. Try again in a few moments."
            }
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
