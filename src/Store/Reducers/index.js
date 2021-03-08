import { combineReducers } from "redux";
import auth from "./Auth";
import message from "./Message";
import cart from "./Cart";
import wishlist from "./WishList";

export default combineReducers({
  auth,
  message,
  cart,
  wishlist
});