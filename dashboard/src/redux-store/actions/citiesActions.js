import {
  SET_CITIES,
  ADD_CITY,
  DELETE_CITY,
  UPDATE_CITY,
} from "../types/citiesTypes";

export const setCities = (payload) => {
  return {
    payload,
    type: SET_CITIES,
  };
};

export const addCity = (payload) => {
  return {
    type: ADD_CITY,
    payload,
  };
};

export const updateCity = (payload) => {
  return {
    type: UPDATE_CITY,
    payload,
  };
};

export const deleteCity = (id) => {
  return {
    type: DELETE_CITY,
    payload: id,
  };
};
