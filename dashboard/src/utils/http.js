import axios from "axios";

const postRequest = (url, data, config = {}) => {
  return axios.post(url, data, config);
};
const getRequest = (url, config = {}) => {
  return axios.get(url, config);
};
const putRequest = (url, data, config = {}) => {
  return axios.put(url, data, config);
};
const deleteRequest = (url, config) => {
  return axios.delete(url, config);
};

export { putRequest, postRequest, getRequest, deleteRequest };
