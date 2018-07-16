import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import * as actions from '../../actions';

class SignUp extends Component {
  handleFormSubmit = (formProps) => {
    this.props.signupUser(formProps, this.props.history);
  }

  renderInput = (field) => {
    const { meta: { touched, error } } = field;

    return (
      <div>
        <input {...field.input} type={field.type} className="form-control" />
        <div className="error">{touched && error}</div>
      </div>
    );
  }

  renderAlert = () => {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          { this.props.errorMessage }
        </div>
      )
    }
  }

  render() {
    const { handleSubmit, fields: { email, password, passwordConfirm } } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        <fieldset className="form-group">
          <label>Email:</label>
          <Field
            name="email"
            component={this.renderInput}
            type="text"
          />
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <Field
            name="password"
            component={this.renderInput}
            type="password"
          />
        </fieldset>
        <fieldset className="form-group">
          <label>Comform Password:</label>
          <Field
            name="passwordConfirm"
            component={this.renderInput}
            type="password"
          />
        </fieldset>
        { this.renderAlert() }
        <button className="btn btn-primary">Sign up!</button>
      </form>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }

  if (!formProps.password) {
    errors.password = 'Please enter an password';
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter an passwordConfirm';
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match';
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

SignUp = reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm'],
  validate
})(SignUp);

SignUp = connect(mapStateToProps, actions)(SignUp)

export default SignUp;
