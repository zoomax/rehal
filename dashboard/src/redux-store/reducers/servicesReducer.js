import { SET_SERVICES } from "../types/servicesTypes";
export const ServicesReducer = (state = [], { type, payload }) => {
  switch (type) {
    case SET_SERVICES:
      return [...payload];
    default:
      return state;
  }
};

