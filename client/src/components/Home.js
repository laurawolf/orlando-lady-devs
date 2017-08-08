import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import '../App.css';
import { fetchUser } from '../actions';

class Home extends Component {

  static contextTypes = {
    router: React.PropTypes.object
  }

  componentWillMount() {
    this.props.fetchUser();
  }

  componentWillUpdate(nextProps) {
    if (nextProps.authenticated) {
      this.context.router.history.push('/organizer');
    }
  }

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
const mapStatetoProps = state => ({
  authenticated: state.user.authenticated
});

export default connect(mapStatetoProps, { fetchUser })(Home);
