import { setObjToLocalStorage } from "../../utils/localStorage";
import { SET_USER, REMOVE_USER, UPDATE_USER } from "../types/authTypes";
const initialState = {
  token: null,
  user: null,
};
export const AuthReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_USER:
      setObjToLocalStorage("user", JSON.stringify(payload));
      return {
        user: payload.user,
        token: payload.token,
      };
    case UPDATE_USER:
      const newState = {
        ...state,
        user: payload,
      };
      console.log(payload.image);
      setObjToLocalStorage("user", JSON.stringify(newState));
      return { ...newState };
    case REMOVE_USER:
      localStorage.removeItem("user");
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
