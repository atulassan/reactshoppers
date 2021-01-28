import { combineReducers } from "redux";
import auth from "./Auth";
import message from "./Message";
import cart from "./Cart";

export default combineReducers({
  auth,
  message,
  cart
});