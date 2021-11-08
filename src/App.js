import "./styles.css";
import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
//import { signInWithGoogle, signOutWithGoogle } from "./firebase/firebase.util";
import { auth, CreateProfile } from "./firebase/firebase.util";
import { setCurrentUser } from "./redux/user/user.actions";
import SignIn from "./page/SignIn";
import LandingPage from "./page/LandingPage";
import View from "./page/view";

var landingPage;
class App extends React.Component {
  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (user) => {
      this.props.setCurrentUser(user);
      await CreateProfile(user);
    });
  }

  render() {
    const currentUser = this.props.currentUser;
    if (currentUser === null) {
      landingPage = <SignIn />;
    } else {
      landingPage = <LandingPage />;
    }
    return (
      <div className="App">
        <Route exact path="/">
          {landingPage}
        </Route>
        <Route path="/v/:userId">
          <View />
        </Route>
      </div>
    );
  }
}

const mapStateToProp = (state) => ({
  currentUser: state.user.currentUser
});

const mapDispatchToProp = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUser(user))
});
export default connect(mapStateToProp, mapDispatchToProp)(App);
