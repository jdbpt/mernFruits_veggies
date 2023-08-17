import React, { Component } from 'react'

class ErrorPage extends Component {
  render() {
    const error = this.props.error;
    return (
      <div>
        <h1>Error Encountered</h1>
        <h2>{error}</h2>
        <h3>Try again</h3>
      </div>
    )
  }
};

module.exports = ErrorPage;
