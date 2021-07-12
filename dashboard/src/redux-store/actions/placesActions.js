import {
  SET_PLACES,
  ADD_PLACE,
  DELETE_PLACE,
  UPDATE_PLACE,
} from "../types/placesTypes";

export const setPlaces = (payload) => {
  return {
    payload,
    type: SET_PLACES,
  };
};

export const addPlace = (payload) => {
  return {
    type: ADD_PLACE,
    payload,
  };
};

export const updatePlace = (payload) => {
  return {
    type: UPDATE_PLACE,
    payload,
  };
};

export const deletePlace = (id) => {
  return {
    type: DELETE_PLACE,
    payload: id,
  };
};
