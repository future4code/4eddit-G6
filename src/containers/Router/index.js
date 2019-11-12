import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Switch, Route } from "react-router-dom";
import LoginPage from "../LoginPage";
import SignupPage from "../SignupPage";

export const routes = {
  root: "/",
  signUp: "/signup",
  feedPost: "/feed/",
  post: "/feed/:id"
};

function Router(props) {
  return (
    <ConnectedRouter history={props.history}>
      <Switch>
        <Route path={routes.signUp} component={SignupPage} />
        <Route path={routes.root} component={LoginPage} />
      </Switch>
    </ConnectedRouter>
  );
}

export default Router;
