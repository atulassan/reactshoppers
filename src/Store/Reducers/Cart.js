import {
  LISTCART,
  ADDTOCART,
  REMOVECART,
} from "../Actions/ActionTypes";

const cartData = JSON.parse(localStorage.getItem("cartData") || '[]');
  
  //console.log('inital data', cartData);

  const initialState = { ls: 1, cartData: cartData };
  
  export default function (state = initialState, action) {

    const { type, payload } = action;
  
    switch (type) {
      case LISTCART:
        return {
          ...state,
        };
      case ADDTOCART:
        return {
          ...state,
          cartData: payload.cartData
        };
      case REMOVECART:
        return {
          ...state,
          cartData: payload.cartData
        };
      default:
        return state;
    }
  }