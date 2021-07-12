import {
  SET_CITIES,
  ADD_CITY,
  DELETE_CITY,
  UPDATE_CITY,
} from "../types/citiesTypes";
import { filterArray, getArrayItem } from "../../utils/array-filters";
export const CitiesReducer = (state = [], { type, payload }) => {
  switch (type) {
    case SET_CITIES:
      return [...payload];
    case ADD_CITY:
      return [...state, payload];
    case DELETE_CITY:
      console.log(filterArray(payload, state));
      return [...filterArray(payload, state)];
    case UPDATE_CITY:
      const cityItem = getArrayItem(payload.id, state);
      if (cityItem.item) {
        state[cityItem.index] = payload;
      }
      return [...state];
    default:
      return state;
  }
};
