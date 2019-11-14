import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Switch, Route } from "react-router-dom";
import LoginPage from "../LoginPage";
import SignupPage from "../SignupPage";
import FeedPage from "../FeedPage";
import PostPage from "../PostPage";

export const routes = {
  root: "/",
  signUpPage: "/signup",
  feedPage: "/feed/",
  postPage: "/feed/:id",
  loginPage: "/login"
};

function Router(props) {
  return (
    <ConnectedRouter history={props.history}>
      <Switch>
        <Route path={routes.loginPage} component={LoginPage} />
        <Route path={routes.postPage} component={PostPage} />
        <Route path={routes.signUpPage} component={SignupPage} />
        <Route path={routes.root} component={FeedPage} />
      </Switch>
    </ConnectedRouter>
  );
}

export default Router;
