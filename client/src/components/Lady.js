import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { postQuestions } from '../actions/questions';
import '../App.css';

class Lady extends Component {

  onSubmit(values) {
    this.props.postQuestions(values);
  }

  renderField(field) {
    return (
      <div>
        <label htmlFor="field">{field.label}</label>
        <input
          type="text"
          {...field.input}
        />
      {field.meta.touched ? field.meta.error : ''}
      </div>
    );
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="App">

        <div className="App-header">
          <h2>Orlando Lady Devs</h2>
          <p className="App-intro">
            We want to get to know you bettter!
          </p>
        </div>

        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
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
          <Field
            label="Company"
            name="currentCompany"
            component={this.renderField}
          />
          <Field
            label="Position"
            name="currentPosition"
            component={this.renderField}
          />
          <Field
            label="What technologies do you know?"
            name="currentExpertise"
            component={this.renderField}
          />
          <Field
            label="What technologies are you currently learning?"
            name="currentlyLearning"
            component={this.renderField}
          />
          <Field
            label="What technologies are you interested in learning?"
            name="interestedInLearning"
            component={this.renderField}
          />
          <Field
            label="Please give us suggestions of topics you would like to see at the meetups?"
            name="meetupSuggestions"
            component={this.renderField}
          />


        <button type="submit">Submit</button>

        </form>

      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = 'Enter your first name';
  }

  if (!values.lastName) {
    errors.lastName = 'Enter your last name';
  }

  if (!values.email) {
    errors.email = 'Enter your email';
  }

  return errors;
}

export default reduxForm({
  validate,
  form: 'LadiesNewForm'
})(
  connect(null, { postQuestions })(Lady)
);
