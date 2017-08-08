import React, { Component } from 'react';
import '../App.css';
import requireAuth from './require-auth';

class Organizer extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Orlando Lady Devs</h2>
        </div>
        <p className="App-intro">
          These are the Orlando Lady Devs!
        </p>
      </div>
    );
  }
}

export default requireAuth(Organizer);
