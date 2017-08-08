import React, { Component } from 'react';
import { connect } from 'react-redux';

export default (ComposedComponent) => {
  class Authentication extends Component {
    static contextTypes = {
      router: React.PropTypes.object
    }

    componentWillMount() {
      if (!this.props.authenticated) {
        this.context.router.history.push('/');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.context.router.history.push('/');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />;
    }
  }

  const mapStatetoProps = state => ({
    authenticated: state.user.authenticated
  });

  return connect(mapStatetoProps)(Authentication);
};
