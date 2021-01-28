import {
  CustomPayload,
  ErrorPayload,
  FetchDataFromApiType,
  FetchDataFromLocalType,
  FetchListActions,
  SearchActionTypes,
  searchByEnum,
  SuccessActionPayload,
} from './search.types';
import { Dispatch } from 'redux';
import { fetchUsersByUserName, fetchReposByName } from '../../../api/api';
import { AxiosResponse } from 'axios';
import { User } from './models/users.model';
import { Repository } from './models/repos.model';
import { ApiResponse } from '../../../api/api.types';

/**
 * Action creator which will dispatch a function to the search reducer.
 * @param searchTerm the text typed by user in the input text.
 * @param type type of search , whether by user or by repository.
 * @param isCached a boolean flag to determine if we fetch data from api or from our cached data.
 *
 * @returns a function which dispatch the needed action for doing the search.
 */

export const proceedSearch = (
  searchTerm: string,
  type: string,
  isCached: boolean
) =>
  isCached
    ? fetchDataFromLocalStorage(searchTerm, type)
    : fetchDataFromApi(searchTerm, type);

/**
 * Action creator responsible for dispatching an action about changing the search type (user | repo)
 *
 * @param searchTerm the text typed by user in the input text.
 * @param type type of search , whether by user or by repository.
 * @param isCached a boolean flag to determine if we fetch data from api or from our cached data.
 *
 * @returns a function which dispatch the needed action for doing the search.
 */

export const toggleSearchType = (
  type: string,
  searchTerm: string,
  isCached: boolean,
  dispatcher: Dispatch<any>
) =>
  searchTerm.length <= 2
    ? changedSearchType(type, searchTerm, false, isCached, dispatcher)
    : changedSearchType(type, searchTerm, true, isCached, dispatcher);
/**
 *
 * @param searchTerm the text typed by user in the input text.
 * @param type type of search , whether by user or by repository.
 *
 * @returns a function of type Dispatch<SearchActionTypes<CustomPayload>> t
 */
export const clearList = (searchTerm: string, type: string) => async (
  dispatch: Dispatch<SearchActionTypes<CustomPayload>>
) => {
  dispatch({
    type: FetchListActions.CLEAR_LIST,
    payload: {
      searchTerm,
      searchBy: type,
    } as CustomPayload,
  });
};

// Local functions used only here

/**
 * Local function to return the actions related to fetching data from API.
 *
 * @param searchTerm the text typed by user in the input text.
 * @param type type of search , whether by user or by repository.
 *
 * @returns a function which dispatch the needed action for doing the search.
 */
const fetchDataFromApi = (searchTerm: string, type: string) => async (
  dispatch: Dispatch<SearchActionTypes<FetchDataFromApiType>>
) => {
  dispatch({
    type: FetchListActions.LIST_LOADING,
    payload: searchTerm,
  });
  try {
    const dataFromRemote =
      type === searchByEnum.USERS
        ? ((await fetchUsersByUserName(searchTerm)) as AxiosResponse<
            ApiResponse<User>
          >)
        : ((await fetchReposByName(searchTerm)) as AxiosResponse<
            ApiResponse<Repository>
          >);
    dispatch({
      type: FetchListActions.LIST_SUCCESS,
      payload: {
        searchBy: type,
        repos:
          type === searchByEnum.REPOSITORY ? dataFromRemote.data.items : [],
        users: type === searchByEnum.USERS ? dataFromRemote.data.items : [],
        searchTerm,
      } as SuccessActionPayload,
    });
  } catch (e) {
    dispatch({
      type: FetchListActions.LIST_FAILED,
      payload: {
        code: 500,
        message: 'Oops, Something went Wrong',
        searchTerm,
      } as ErrorPayload,
    });
  }
};

/**
 * Local function to return the actions related to fetching data from Local Storage.
 *
 * @param searchTerm the text typed by user in the input text.
 * @param type type of search , whether by user or by repository.
 *
 * @returns a function which dispatch the needed action for doing the search.
 */
const fetchDataFromLocalStorage = (searchTerm: string, type: string) => async (
  dispatch: Dispatch<SearchActionTypes<FetchDataFromLocalType>>
) => {
  dispatch({
    type: FetchListActions.LIST_LOADING,
    payload: null,
  });
    dispatch({
      type: FetchListActions.LOAD_FROM_LOCAL,
      payload: {
        searchTerm,
        searchBy: type,
      } as CustomPayload,
    });
};

/**
 * Local function to return the actions which will be dispatched for switching the search type .
 *
 * @param searchTerm the text typed by user in the input text.
 * @param type type of search , whether by user or by repository.
 *
 * @returns a function which dispatch the needed action to change the type of search between user and repo
 */

const changedSearchType = (
  type: string,
  searchTerm: string,
  shouldSearch: boolean,
  isCached: boolean,
  dispatcher: Dispatch<any>
) => async (dispatch: Dispatch<SearchActionTypes<any>>) => {
  dispatch({
    type,
    payload: searchTerm,
  });
    if (shouldSearch) {
      dispatcher(proceedSearch(searchTerm, type, isCached));
    }
};
