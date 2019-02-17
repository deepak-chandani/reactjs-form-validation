import React from "react";
import Joi from "joi-browser";

class RegisterForm extends React.Component {
  state = {
    email: "",
    password: "",
    name: "",
    errors: {}
  };

  rules = {
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    name: Joi.string()
      .min(3)
      .max(30)
      .required()
  };

  onChange({ target }) {
    this.setState({
      [target.name]: target.value
    });

    let fieldError = this.validateAttribute(target.name, target.value);
    let errors = { ...this.state.errors };
    if (fieldError) {
      errors[target.name] = fieldError;
    } else {
      delete errors[target.name];
    }
    this.setState({ errors: errors });
  }

  validateAttribute(name, value) {
    const obj = {
      [name]: value
    };

    const schema = Joi.object().keys({
      [name]: this.rules[name]
    });

    const result = Joi.validate(obj, schema);
    if (result.error == null) return null;

    return result.error.details[0].message;
  }

  hasErrors() {
    return Object.keys(this.state.errors).length > 0;
  }

  render() {
    this.onChange = this.onChange.bind(this);
    const { email, password, name, errors } = this.state;

    return (
      <form class="form-horizontal" role="form">
        <div className="form-group">
          <label className="col-md-3" htmlFor="email">
            Email address
          </label>
          <div className="col-md-9">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              value={email}
              onChange={this.onChange}
            />
            {errors.email && (
              <div class="alert alert-danger mt-1">{errors.email}</div>
            )}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={this.onChange}
          />
          {errors.password && (
            <div class="alert alert-danger mt-1">{errors.password}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="name"
            className="form-control"
            id="name"
            name="name"
            placeholder="Name"
            value={name}
            onChange={this.onChange}
          />
          {errors.name && (
            <div class="alert alert-danger mt-1">{errors.name}</div>
          )}
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={this.hasErrors()}
        >
          Submit
        </button>

        <div>{JSON.stringify(this.state.errors)}</div>
      </form>
    );
  }
}

export default RegisterForm;
