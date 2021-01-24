import { fetchReposByName } from './../../../api/api';
import {
  LIST_FAILED,
  LIST_LOADING,
  LIST_SUCCESS,
  LoadFromLocalPayload,
  LOAD_FROM_LOCAL,
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

export const proceedSearch = (
  searchTerm: string,
  type: string,
  isCached: boolean
) =>
  isCached
    ? fetchDataFromLocalStorage(searchTerm, type)
    : fetchDataFromApi(searchTerm, type);

export const toggleSearchType = (type: string) => (
  dispatch: Dispatch<SearchActionTypes<string>>
) => {
  dispatch({
    type,
    payload: 'null',
  });
};

const fetchDataFromApi = (searchTerm: string, type: string) => async (
  dispatch: Dispatch<SearchActionTypes<any>>
) => {
  dispatch({
    type: LIST_LOADING,
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
      type: LIST_SUCCESS,
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
      type: LIST_FAILED,
      payload: {
        code: 12,
        message: e,
      },
    });
  }
};

const fetchDataFromLocalStorage = (searchTerm: string, type: string) => async (
  dispatch: Dispatch<SearchActionTypes<any>>
) => {
  dispatch({
    type: LIST_LOADING,
    payload: null,
  });
  setTimeout(() => {
    dispatch({
      type: LOAD_FROM_LOCAL,
      payload: {
        searchTerm,
        searchBy: type,
      } as LoadFromLocalPayload,
    });
  }, 1000);
};
