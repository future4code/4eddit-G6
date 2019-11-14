import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Switch, Route } from "react-router-dom";
import LoginPage from "../LoginPage";
import SignupPage from "../SignupPage";
import FeedPage from "../FeedPage";
import PostPage from "../PostPage";

export const routes = {
  root: "/",
  signUp: "/signup",
  feedPage: "/feed/",
  post: "/feed/:id",
  login: "/login"
};

function Router(props) {
  return (
    <ConnectedRouter history={props.history}>
      <Switch>
        <Route path={routes.login} component={LoginPage} />
        <Route path={routes.post} component={PostPage} />
        <Route path={routes.signUp} component={SignupPage} />
        <Route path={routes.root} component={FeedPage} />
      </Switch>
    </ConnectedRouter>
  );
}

export default Router;
