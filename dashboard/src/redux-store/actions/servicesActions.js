import { SET_SERVICES } from "../types/servicesTypes";

export const setServices = (payload) => {
  return {
    payload,
    type: SET_SERVICES,
  };
};
