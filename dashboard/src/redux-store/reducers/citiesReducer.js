import { SET_CITIES } from "../types/citiesTypes";
export const CitiesReducer = (state = [], { type, payload }) => {
  switch (type) {
    case SET_CITIES:
      return [...payload];
    default:
      return state;
  }
};