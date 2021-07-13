import { SET_PLACES } from "../types/placesTypes";
export const PlacesReducer = (state = [], { type, payload }) => {
  switch (type) {
    case SET_PLACES:
      return [...payload];
    default:
      return state;
  }
};