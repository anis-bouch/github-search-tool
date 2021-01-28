import { repoData } from './../../../__mocks__/mock-data';
import { userData } from '../../../__mocks__/mock-data';
import { initState } from './init-data';
import * as reducer from './search.reducer';
import * as types from './search.types';

describe('search reducer', () => {
    let initialState: types.GlobalState;
    beforeEach(() => {
        initialState = initState;
    })
  
  it('should return the init state', () => {
    expect(
      reducer.searchReducer(undefined, {
        type: undefined,
        payload: undefined,
      })
    ).toEqual(initialState);
  });
  it('should return the CLEAR_LIST state', () => {
    expect(
      reducer.searchReducer(initialState, {
        type: types.FetchListActions.CLEAR_LIST,
        payload: {
          searchBy: 'user',
          searchTerm: 'anis',
        },
      })
    ).toEqual({
      ...initialState,
      searchType: 'user',
      currentSearchTerm: 'anis',
      usersToBeShown: [],
      repositoriesToBeShown: [],
      error: {
        code: 0,
        message: '',
      },
    });
  });
  it('should return the  state after List_FAILED action ', () => {
    expect(
      reducer.searchReducer(initialState, {
        type: types.FetchListActions.LIST_FAILED,
        payload: {
          code: 500,
          message: 'Oops, Something went Wrong',
          searchTerm: 'anis',
        },
      })
    ).toEqual({
      ...initialState,
      loading: false,
      currentSearchTerm: 'anis',
      error: {
        code: 500,
        message: 'Oops, Something went Wrong',
      },
    });
  });
  it('should return the  state after LIST_LOADING action ', () => {
    expect(
      reducer.searchReducer(initialState, {
        type: types.FetchListActions.LIST_LOADING,
        payload: 'anis',
      })
    ).toEqual({
      ...initialState,
      loading: true,
      currentSearchTerm: 'anis',
      error: {
        code: 0,
        message: '',
      },
    });
  });

  it('should return the  state after user action ', () => {
    expect(
      reducer.searchReducer(initialState, {
        type: types.searchByEnum.USERS,
        payload: 'anis',
      })
    ).toEqual({
      ...initialState,
      searchType: types.searchByEnum.USERS,
      currentSearchTerm: 'anis',
      error: {
        code: 0,
        message: '',
      },
    });
  });
  it('should return the  state after repo action ', () => {
    expect(
      reducer.searchReducer(initialState, {
        type: types.searchByEnum.REPOSITORY,
        payload: 'anis',
      })
    ).toEqual({
      ...initialState,
      searchType: types.searchByEnum.REPOSITORY,
      currentSearchTerm: 'anis',
      error: {
        code: 0,
        message: '',
      },
    });
  });

  it('should return the  state after LIST_SUCCESS action for user ', () => {
    expect(
      reducer.searchReducer(initialState, {
        type: types.FetchListActions.LIST_SUCCESS,
        payload: {
          searchBy: 'user',
          repos: [],
          users: [userData],
          searchTerm: 'anis',
        },
      })
    ).toEqual({
      ...initialState,
      usersToBeShown: [userData],
      repositoriesToBeShown: [],
      previousSearchesUsers: ['anis'],
      previousSearchesRepositories: [],
      loading: false,
      cachedUsers: [userData],
      cachedRepositories: [],
      currentSearchTerm: 'anis',
      error: {
        code: 0,
        message: '',
      },
    });
  });

  it('should return the  state after LIST_SUCCESS action for repo ', () => {
    expect(
      reducer.searchReducer(initialState, {
        type: types.FetchListActions.LIST_SUCCESS,
        payload: {
          searchBy: 'repository',
          repos: [repoData],
          users: [],
          searchTerm: 'theme',
        },
      })
    ).toEqual({
      ...initialState,
      usersToBeShown: [],
      repositoriesToBeShown: [repoData],
      previousSearchesUsers: [],
      previousSearchesRepositories: ['theme'],
      loading: false,
      cachedUsers: [],
      cachedRepositories: [repoData],
      currentSearchTerm: 'theme',
      error: {
        code: 0,
        message: '',
      },
    });
  });

  it('should return the  state after LOAD_FROM_LOCAL action for user ', () => {
    initialState.cachedUsers.push(userData);
    expect(
      reducer.searchReducer(initialState , {
        type: types.FetchListActions.LOAD_FROM_LOCAL,
        payload: {
          searchTerm: 'anis',
          searchBy: 'user',
        },
      })
    ).toEqual({
      ...initialState,
      usersToBeShown: [userData],
      repositoriesToBeShown: [],
      loading: false,
      currentSearchTerm: 'anis',
      error: {
        code: 0,
        message: '',
      },
    });
  });
  it('should return the  state after LOAD_FROM_LOCAL action for repo ', () => {
    initialState.cachedRepositories.push(repoData);
    expect(
      reducer.searchReducer(initialState , {
        type: types.FetchListActions.LOAD_FROM_LOCAL,
        payload: {
          searchTerm: 'theme',
          searchBy: 'repository',
        },
      })
    ).toEqual({
      ...initialState,
      usersToBeShown: [],
      repositoriesToBeShown: [repoData],
      loading: false,
      currentSearchTerm: 'theme',
      error: {
        code: 0,
        message: '',
      },
    });
  });
});
