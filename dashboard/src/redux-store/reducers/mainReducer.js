import { combineReducers } from "redux";
import { AuthReducer } from "./authReducer";
import { CitiesReducer } from "./citiesReducer";
import { PlacesReducer } from "./placesReducer";
import { ServicesReducer } from "./servicesReducer";
export const mainReducer = combineReducers({
  services: ServicesReducer,
  cities: CitiesReducer,
  places: PlacesReducer,
  auth: AuthReducer,
});
