import { fetchReposByName } from './../../../api/api';
import {
  FetchListActions,
  LoadFromLocalPayload,
  SearchActionTypes,
  searchByEnum,
  SuccessActionPayload,
} from './searchTypes';
import { Dispatch } from 'redux';
import { fetchUsersByUserName } from '../../../api/api';
import { ApiResponse } from '../../../api/api-response';
import { AxiosResponse } from 'axios';
import { User } from './models/users';
import { Repository } from './models/repos';

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
 * Local function to return the actions related to fetching data from API.
 *
 * @param searchTerm the text typed by user in the input text.
 * @param type type of search , whether by user or by repository.
 *
 * @returns a function which dispatch the needed action for doing the search.
 */
const fetchDataFromApi = (searchTerm: string, type: string) => async (
  dispatch: Dispatch<SearchActionTypes<any>>
) => {
  dispatch({
    type: FetchListActions.LIST_LOADING,
    payload: null,
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
        code: 12,
        message: e,
      },
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
  dispatch: Dispatch<SearchActionTypes<any>>
) => {
  dispatch({
    type: FetchListActions.LIST_LOADING,
    payload: null,
  });
  setTimeout(() => {
    dispatch({
      type: FetchListActions.LOAD_FROM_LOCAL,
      payload: {
        searchTerm,
        searchBy: type,
      } as LoadFromLocalPayload,
    });
  }, 1000);
};

/**
 * Action creator responsible for dispatching an action about changing the search type (user | repo)
 *
 * @param type
 *
 * @returns a function which dispatch the needed action for doing the search.
 */

export const toggleSearchType = (type: string) => (
  dispatch: Dispatch<SearchActionTypes<string>>
) => {
  dispatch({
    type,
    payload: 'null',
  });
};
