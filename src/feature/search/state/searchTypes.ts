import { Repository } from "./models/repos";
import { User } from "./models/users";

export interface SearchActionTypes<T> {
  type: string;
  payload: T;
}

export enum SearchActionsEnum {
  TRIGGER_SEARCH_USERS = 'TRIGGER_SEARCH_USERS',
  TRIGGER_SEARCH_REPOS = 'TRIGGER_SEARCH_REPOS',
}

export enum searchByEnum {
  USERS = 'user',
  REPOSITORY = 'repository',
}

export const LIST_LOADING = 'LIST_LOADING';
export const LIST_FAILED = 'LIST_FAILED';
export const LIST_SUCCESS = 'LIST_SUCCESS';

// state

export interface SuccessActionPayload {
  users: User[];
  repos: Repository[];
  searchBy: string;
  searchTerm: string;
}

export interface GlobalState {
  users: User[];
  repositories: Repository[];
  previousSearchesUsers: string[];
  previousSearchesRepositories: string[];
  searchType: string;
  loading: boolean;
  error: apiError;
}

export interface apiError {
  code: number;
  message: string;
}
