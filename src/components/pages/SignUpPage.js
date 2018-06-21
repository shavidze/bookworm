import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { signup } from "../../actions/users";

import SignUpForm from "../forms/SignUpForm";

class SignUpPage extends React.Component {
  submit = data =>
    this.props.signup(data).then(() => {
      console.log(this.props.history.push);
      this.props.history.push("/dashboard");
      console.log(this.props.history);
    });

  render() {
    return (
      <div>
        <SignUpForm submit={this.submit} />
      </div>
    );
  }
}

SignUpPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  signup: PropTypes.func.isRequired
};
export default connect(
  null,
  { signup }
)(withRouter(SignUpPage));
