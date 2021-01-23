import {combineReducers} from "redux";
import { searchReducer } from "./features/search/state/searchReducer";

const RootReducer = combineReducers({
  search: searchReducer
});

export default RootReducer