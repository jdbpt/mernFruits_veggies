import React, { Component } from 'react'

class Home extends Component {
    render() {
        return (
            <div>
                <h1>Explore Veggies and See/Add fruits</h1>
                <nav style={{padding: "10px"}}>
                    <p><a href='/fruits'>Main Fruits Page</a></p>
                    <p><a href='/veggies'>Main Veggies Page</a></p>
                </nav>
            </div>
        );
    }
};

module.exports = Home;
