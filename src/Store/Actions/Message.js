import { SET_MESSAGE, CLEAR_MESSAGE } from "./ActionTypes";

export const setMessage = (message, variant) => ({
  type: SET_MESSAGE,
  payload: { message, variant },
});

export const clearMessage = () => ({
  type: CLEAR_MESSAGE,
});