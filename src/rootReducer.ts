import {combineReducers} from "redux";
import { searchReducer } from "./feature/search/state/searchReducer";

const RootReducer = combineReducers({
  search: searchReducer
});

export default RootReducer