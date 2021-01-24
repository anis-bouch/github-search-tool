import { searchByEnum, LOAD_FROM_LOCAL } from './searchTypes';
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
        usersToBeShown:
          action.payload.searchBy === searchByEnum.USERS
            ? action.payload.users
            : state.usersToBeShown,
        repositoriesToBeShown:
          action.payload.searchBy === searchByEnum.REPOSITORY
            ? action.payload.repos
            : state.repositoriesToBeShown,
        previousSearchesUsers:
          action.payload.searchBy === searchByEnum.USERS
            ? [action.payload.searchTerm, ...state.previousSearchesUsers]
            : state.previousSearchesUsers,
        previousSearchesRepositories:
          action.payload.searchBy === searchByEnum.REPOSITORY
            ? [action.payload.searchTerm, ...state.previousSearchesRepositories]
            : state.previousSearchesRepositories,
        loading: false,
        cachedUsers:
          action.payload.searchBy === searchByEnum.USERS
            ? state.cachedUsers.concat(action.payload.users)
            : state.cachedUsers,
        cachedRepositories:
          action.payload.searchBy === searchByEnum.REPOSITORY
            ? state.cachedRepositories.concat(action.payload.repos)
            : state.cachedRepositories,
      };

    case LOAD_FROM_LOCAL: {
      return {
        ...state,
        usersToBeShown:
          action.payload.searchBy === searchByEnum.USERS
            ? state.usersToBeShown.filter((user) =>
                user.login.includes(action.payload.searchTerm)
              )
            : state.usersToBeShown,
        repositoriesToBeShown:
          action.payload.searchBy === searchByEnum.REPOSITORY
            ? state.repositoriesToBeShown.filter((repo) =>
                repo.full_name.includes(action.payload.searchTerm)
              )
            : state.repositoriesToBeShown,
        loading: false
      };
    }
    case searchByEnum.REPOSITORY || searchByEnum.REPOSITORY:
      return {
        ...state,
        searchType: action.type,
      };

    default:
      return state;
  }
};
