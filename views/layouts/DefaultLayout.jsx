import React, { Component } from 'react'

class DefaultLayout extends Component {
  render() {
    return (
      <html>
        <head>{this.props.title}</head>
        <body>
            <h1>{this.props.title}</h1>
            {this.props.children}
        </body>
       
      </html>
    )
  }
}

module.exports = DefaultLayout;
