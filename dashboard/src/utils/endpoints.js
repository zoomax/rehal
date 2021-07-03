export const BASE_URL = "https://rehalapp2021.herokuapp.com/";
export const LOGIN = "users/login";
export const SERVICES = "services/";
export const CITIES = "cities/";
export const PLACES = "places/";
export const NEW_PLACE = (city, service) =>
  `new/cities/${city}/services/${service}`;
