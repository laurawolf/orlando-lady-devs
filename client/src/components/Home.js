import React, { Component} from 'react';
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
        <button type="button"><a href="#">I'm a lady dev organizer</a></button>
        <button type="button"><a href="#">I'm a lady dev member</a></button>
      </div>
    );
  }
}
