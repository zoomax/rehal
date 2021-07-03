import { SET_SERVICES } from "../types/servicesTypes";

export const setServises = (payload) => {
  return {
    payload,
    type: SET_SERVICES,
  };
};
