import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Route } from "react-router-dom";
import { IntlProvider } from "react-intl";
import Loader from "react-loader";
import HomePage from "./components/pages/HomPage";
import LoginPage from "./components/pages/LoginPage";
import DashboardPage from "./components/pages/DashboardPage";
import SignUpPage from "./components/pages/SignUpPage";
import NewBookPage from "./components/pages/NewBookPage";
import ConfirmationPage from "./components/pages/ConfirmationPage";
import CharactersPage from "./components/pages/CharactersPage";
import NewCharactersPage from "./components/pages/NewCharactersPage";
import ForgotPasswordPage from "./components/pages/ForgotPasswordPage";
import ResetPasswordPage from "./components/pages/ResetPasswordPage";
import UserRoute from "./components/routes/UserRoute";
import GuestRoute from "./components/routes/GuestRoute";
import TopNavigation from "./components/navigation/TopNavigation";
import { fetchCurrentUser } from "./actions/users";
import messages from "./messages";

class App extends React.Component {
  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.fetchCurrentUser();
    }
  }

  render() {
    const { isAuthenticated, location, loaded, lang } = this.props;
    return (
      <IntlProvider locale={lang} message={messages[lang]}>
        <div>
          <Loader loaded={loaded}>
            <div className="ui container">
              {isAuthenticated && <TopNavigation />}
              <Route location={location} path="/" exact component={HomePage} />
              <Route
                location={location}
                path="/confirmation/:token"
                exact
                component={ConfirmationPage}
              />
              <GuestRoute
                location={location}
                path="/login"
                exact
                component={LoginPage}
              />
              <GuestRoute
                location={location}
                path="/signup"
                exact
                component={SignUpPage}
              />
              <GuestRoute
                location={location}
                path="/forgot_password"
                exact
                component={ForgotPasswordPage}
              />
              <GuestRoute
                location={location}
                path="/reset_password/:token"
                exact
                component={ResetPasswordPage}
              />
              <UserRoute
                location={location}
                path="/dashboard"
                exact
                component={DashboardPage}
              />

              <UserRoute
                location={location}
                path="/characters"
                exact
                component={CharactersPage}
              />

              <UserRoute
                location={location}
                path="/characters/new"
                exact
                component={NewCharactersPage}
              />

              <UserRoute
                location={location}
                path="/books/new"
                exact
                component={NewBookPage}
              />
            </div>
          </Loader>
        </div>
      </IntlProvider>
    );
  }
}

App.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  fetchCurrentUser: PropTypes.func.isRequired,
  loaded: PropTypes.bool.isRequired,
  lang: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.email,
    loaded: state.user.loaded,
    lang: state.locale.lang
  };
}

export default connect(
  mapStateToProps,
  { fetchCurrentUser }
)(App);
