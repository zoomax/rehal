import { SET_CITIES } from "../types/citiesTypes";

export const setCities = (payload) => {
  return {
    payload,
    type: SET_CITIES,
  };
};
