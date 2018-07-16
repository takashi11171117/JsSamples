import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import * as actions from '../../actions';

class SignIn extends Component {
  handleFormSubmit = ({ email, password }) => {
    this.props.signinUser({ email, password }, this.props.history);
  }

  renderInput = (field) => {
    const { meta: { touched, error } } = field;

    return (
      <div>
        <input {...field.input} type={field.type} className="form-control" />
        {touched && error}
        <span>{error}</span>
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
    const { handleSubmit, fields: { email, password } } = this.props;

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
        { this.renderAlert() }
        <button className="btn btn-primary">Sign in</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

SignIn = reduxForm({
  form: 'signin',
  fields: ['email', 'password']
})(SignIn);

SignIn = connect(mapStateToProps, actions)(SignIn)

export default withRouter(SignIn);
