import {
  SET_SERVICES,
  ADD_SERVICE,
  DELETE_SERVICE,
  UPDATE_SERVICE,
} from "../types/servicesTypes";
import { filterArray, getArrayItem } from "../../utils/array-filters";
export const ServicesReducer = (state = [], { type, payload }) => {
  switch (type) {
    case SET_SERVICES:
      return [...payload];
    case ADD_SERVICE:
      return [...state, payload];
    case DELETE_SERVICE:
      return [...filterArray(payload, state)];
    case UPDATE_SERVICE:
      const serviceItem = getArrayItem(payload.id, state);
      if (serviceItem.item) {
        state[serviceItem.index] = payload;
      }
      return [...state];
    default:
      return state;
  }
};
