import {
  SET_PLACES,
  ADD_PLACE,
  DELETE_PLACE,
  UPDATE_PLACE,
} from "../types/placesTypes";
import { filterArray, getArrayItem } from "../../utils/array-filters";
export const PlacesReducer = (state = [], { type, payload }) => {
  switch (type) {
    case SET_PLACES:
      return [...payload];
    case ADD_PLACE:
      return [...state, payload];
    case DELETE_PLACE:
      return [...filterArray(payload, state)];
    case UPDATE_PLACE:
      const placeItem = getArrayItem(payload.id, state);
      if (placeItem.item) {
        state[placeItem.index] = payload;
      }
      return [...state];
    default:
      return state;
  }
};
