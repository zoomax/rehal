import {
  SET_SERVICES,
  DELETE_SERVICE,
  UPDATE_SERVICE,
  ADD_SERVICE,
} from "../types/servicesTypes";

export const setServices = (payload) => {
  return {
    payload,
    type: SET_SERVICES,
  };
};

export const addService = (payload) => {
  return {
    type: ADD_SERVICE,
    payload,
  };
};

export const updateService = (payload) => {
  return {
    type: UPDATE_SERVICE,
    payload,
  };
};

export const deleteService = (id) => {
  return {
    type: DELETE_SERVICE,
    payload: id,
  };
};
