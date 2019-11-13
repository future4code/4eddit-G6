import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { feed } from "./feed"
import { post } from "./post"

export const generateReducers = history =>
  combineReducers({
    router: connectRouter(history),
    feed,
    post
  });
