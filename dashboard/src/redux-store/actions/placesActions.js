import { SET_PLACES } from "../types/placesTypes";

export const setPlaces = (payload) => {
  return {
    payload,
    type: SET_PLACES,
  };
};
