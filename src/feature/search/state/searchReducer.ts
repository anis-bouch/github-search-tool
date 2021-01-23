import { searchByEnum } from './searchTypes';
import { initState } from './init-data';
import {
  SearchActionTypes,
  GlobalState,
  LIST_LOADING,
  LIST_FAILED,
  LIST_SUCCESS,
} from './searchTypes';

export const searchReducer = (
  state: GlobalState = initState,
  action: SearchActionTypes<any>
): GlobalState => {
  switch (action.type) {
    case LIST_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case LIST_FAILED: {
      return {
        ...state,
        loading: false,
        error: {
          code: action.payload.code,
          message: action.payload.message,
        },
      };
    }
    case LIST_SUCCESS:
      return {
        ...state,
        users:
          action.payload.searchBy === 'USER'
            ? action.payload.users
            : state.users,
        repositories:
          action.payload.searchBy === 'REPOSITORY'
            ? action.payload.repos
            : state.repositories,
        previousSearchesUsers:
          action.payload.searchBy === 'USER'
            ? [action.payload.searchTerm, ...state.previousSearchesUsers]
            : state.previousSearchesUsers,
        previousSearchesRepositories:
          action.payload.searchBy === 'REPOSITORY'
            ? [action.payload.searchTerm, ...state.previousSearchesRepositories]
            : state.previousSearchesRepositories,
        loading: false,
        
      };
    case searchByEnum.REPOSITORY || searchByEnum.REPOSITORY:
      return {
        ...state,
        searchType: action.type,
      };

    default:
      return state;
  }
};
