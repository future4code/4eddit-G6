import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Switch, Route } from "react-router-dom";
import LoginPage from "../LoginPage";
import SignupPage from "../SignupPage";
import FeedPost from "../FeedPost";

export const routes = {
  root: "/",
  signUp: "/signup",
  feedPost: "/feed/",
  post: "/feed/:id",
  login:"/login"
};

function Router(props) {
  return (
    <ConnectedRouter history={props.history}>
      <Switch>
      <Route path={routes.login} component={LoginPage} />
        <Route path={routes.signUp} component={SignupPage} />
        <Route path={routes.root} component={FeedPost} />
      </Switch>
    </ConnectedRouter>
  );
}

export default Router;
