import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Switch, Route } from "react-router-dom";
import LoginPage from '../LoginPage/LoginPage.js';

export const routes = {
  root:"/",
  signUp:"/signup",
  feedPost:"/signup/feedpost",
  post:"signup/feedpost/post"
};

function Router(props) {
  return (
    <ConnectedRouter history={props.history}>
      <Switch>
        <Route path={routes.root} component={LoginPage} />
      </Switch>
    </ConnectedRouter>
  );
}

export default Router;
