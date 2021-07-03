import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { mainReducer } from "./reducers/mainReducer";
export default createStore(mainReducer, composeWithDevTools());
