import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import '../App.css';

class Lady extends Component {

  renderField(field) {
    return (
      <div>
        <label htmlFor="field">{field.label}</label>
        <input
          type="text"
          {...field.input}
        />
      </div>
    );
  }

  render() {
    return (
      <div className="App">

        <div className="App-header">
          <h2>Orlando Lady Devs</h2>
          <p className="App-intro">
            We want to get to know you bettter!
          </p>
        </div>

        <form>
          <Field
            label="First Name"
            name="firstName"
            component={this.renderField}
          />
          <Field
            label="Last Name"
            name="lastName"
            component={this.renderField}
          />
          <Field
            label="Email"
            name="email"
            component={this.renderField}
          />

        </form>

      </div>
    );
  }
}

export default reduxForm({
  form: 'LadiesNewForm'
})(Lady);
