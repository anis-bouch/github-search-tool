import { Repository } from './models/repos';
import { User } from './models/users';
/**
 * SearchActionTypes is a Generic interface to describe an action type.
 */
export interface SearchActionTypes<T> {
  type: string;
  payload: T;
}

/**
 * Search by enum , its a an enum which groups types of search , whether by user or by repository
 */
export enum searchByEnum {
  USERS = 'user',
  REPOSITORY = 'repository',
}

/**
 * FetchListActions its a an enum which groups types of actions,
 * which will be dispatched to our reducer to complete the search
 */
export enum FetchListActions {
  LIST_LOADING = 'LIST_LOADING',
  LIST_FAILED = 'LIST_FAILED',
  LIST_SUCCESS = 'LIST_SUCCESS',
  LOAD_FROM_LOCAL = 'LOAD_FROM_LOCAL',
}

/**
 * SuccessActionPayload, its an interface which describes the type of payloads which will be dispatched,
 * after list is fetched successfully from Api
 */
export interface SuccessActionPayload {
  users: User[];
  repos: Repository[];
  searchBy: string;
  searchTerm: string;
}
/**
 * LoadFromLocalPayload, its an interface which describes the type of payloads which will be dispatched,
 * to tell the reducer we are fetching data from local storage
 */
export interface LoadFromLocalPayload {
  searchTerm: string;
  searchBy: string;
}

/**
 * GlobalState, its an interface which describes our global state structure.
 */
export interface GlobalState {
  usersToBeShown: User[];
  repositoriesToBeShown: Repository[];
  cachedUsers: User[];
  cachedRepositories: Repository[];
  previousSearchesUsers: string[];
  previousSearchesRepositories: string[];
  searchType: string;
  loading: boolean;
  error: ApiError;
}

/**
 * apiError, ts an interface which describes the object which will be sent to reduced in case we get an API error
 */
export interface ApiError {
  code: number;
  message: string;
}
