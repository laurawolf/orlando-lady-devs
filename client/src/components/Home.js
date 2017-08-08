import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

export class Home extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Orlando Lady Devs</h2>
        </div>
        <p className="App-intro">
          Help us find out who the Lady Devs are!
        </p>
        <button type="button">
          <Link to='/organizer'>I'm a lady dev organizer</Link>
          </button>
          <button type="button">
            <Link to='/lady-dev'>I'm a lady dev member</Link>
          </button>
      </div>
    );
  }
}
