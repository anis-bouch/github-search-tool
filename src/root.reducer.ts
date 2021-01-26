import {combineReducers} from "redux";
import { searchReducer } from "./feature/search/state/search.reducer";

const RootReducer = combineReducers({
  search: searchReducer
});

export default RootReducer