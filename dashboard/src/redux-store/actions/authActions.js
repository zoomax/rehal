import { SET_USER, REMOVE_USER, UPDATE_USER } from "../types/authTypes";

export const setUser = (payload) => {
  return {
    payload,
    type: SET_USER,
  };
};

export const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

export const updateUser = (payload) => {
  return {
    type: UPDATE_USER,
    payload
  };
};