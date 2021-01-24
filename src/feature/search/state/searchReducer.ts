import { searchByEnum, FetchListActions } from './searchTypes';
import { initState } from './init-data';
import {
  SearchActionTypes,
  GlobalState,
} from './searchTypes';
/**
 * Search reducer , which is the function responsible about updating our state with no side effects.
 * @param state our global state 
 * @param action the action dispatched 
 * 
 * @returns our global state after modification purely.
 */
export const searchReducer = (
  state: GlobalState = initState,
  action: SearchActionTypes<any>
): GlobalState => {
  switch (action.type) {
    case FetchListActions.LIST_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case FetchListActions.LIST_FAILED: {
      return {
        ...state,
        loading: false,
        error: {
          code: action.payload.code,
          message: action.payload.message,
        },
      };
    }
    case FetchListActions.LIST_SUCCESS:
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

    case FetchListActions.LOAD_FROM_LOCAL: {
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
