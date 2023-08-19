import React, { Component } from 'react'

class ErrorPage extends Component {
  render() {
    const error = this.props.error;
    return (
      <div>
        <h1>Error Encountered</h1>
        <h2>{error}</h2>
        <h3>Try again</h3>
        <nav style={{padding: "10px"}}>
          <p><a href='/'>Home</a></p>
          <p><a href='/fruits'>Main Fruits Page</a></p>
          <p><a href='/veggies'>Main Veggies Page</a></p>
        </nav>
      </div>
    )
  }
};

module.exports = ErrorPage;
