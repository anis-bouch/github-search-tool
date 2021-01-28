import {
  mockedReponseFromAxiosGetRepo,
  mockedStoreForFetchingRepoFromLocal,
  payloadFromFetchReposAPI,
} from './../../../__mocks__/mock-data';
jest.unmock('axios');
import { apiUrls } from './../../../api/api.types';
import { initState } from './init-data';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from './search.action';
import * as types from './search.types';
import expect from 'expect'; // You can use any testing library
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import {
  mockedReponseFromAxiosGetUsers,
  mockedStoreForFetchingUserFromLocal,
  payloadFromFetchUsersAPI,
} from '../../../__mocks__/mock-data';
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mock = new MockAdapter(axios);

describe('async actions', () => {
  it('creates CLEAR_LIST Action ', () => {
    const expectedActions = [
      {
        type: types.FetchListActions.CLEAR_LIST,
        payload: {
          searchBy: 'user',
          searchTerm: 'anis',
        },
      },
    ];
    const store = mockStore(initState);

    return store.dispatch(actions.clearList('anis', 'user') as any).then(() => {
      // return of async actions

      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it('creates proceedSearch for users  Action from Api', () => {
    testUserSearchFromApi();
  });

  it('creates proceedSearch for user Action from stroge', async () => {
    const expectedActions = [
      {
        type: types.FetchListActions.LIST_LOADING,
        payload: null,
      },
      {
        type: types.FetchListActions.LOAD_FROM_LOCAL,
        payload: {
          searchBy: 'user',
          searchTerm: 'anis',
        },
      },
    ];
    const store = mockStore(mockedStoreForFetchingUserFromLocal);

    return store
      .dispatch(actions.proceedSearch('anis', 'user', true) as any)
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates proceedSearch for repo  Action from Api', () => {
    const expectedActions = [
      {
        type: types.FetchListActions.LIST_LOADING,
        payload: 'theme',
      },
      {
        payload: payloadFromFetchReposAPI,
        type: 'LIST_SUCCESS',
      },
    ];
    const store = mockStore(initState);
    mock.onGet(apiUrls.repositories).reply(200, mockedReponseFromAxiosGetRepo);
    return store
      .dispatch(actions.proceedSearch('theme', 'repository', false) as any)
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('creates LIST_LOADING &  LOAD_FROM_LOCAL for repo Action from stroge', async () => {
    const expectedActions = [
      {
        type: types.FetchListActions.LIST_LOADING,
        payload: null,
      },
      {
        type: types.FetchListActions.LOAD_FROM_LOCAL,
        payload: {
          searchBy: 'repository',
          searchTerm: 'theme',
        },
      },
    ];
    const store = mockStore(mockedStoreForFetchingRepoFromLocal);

    return store
      .dispatch(actions.proceedSearch('theme', 'repository', true) as any)
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('create  change type  without Search for user', async () => {
    const expectedActions = [
      {
        type: 'user',
        payload: 'an',
      },
    ];
    const store = mockStore(initState);

    return store
      .dispatch(
        actions.toggleSearchType('user', 'an', false, store.dispatch) as any
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('create  change type  without Search for repo', async () => {
    const expectedActions = [
      {
        type: 'repository',
        payload: 'an',
      },
    ];
    const store = mockStore(initState);

    return store
      .dispatch(
        actions.toggleSearchType(
          'repository',
          'an',
          false,
          store.dispatch
        ) as any
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('create  change type  with Search  user from api', async () => {
    const expectedActions = [
      {
        type: 'user',
        payload: 'anis',
      },
      {
        type: types.FetchListActions.LIST_LOADING,
        payload: 'anis',
      },
    ];
    const store = mockStore(initState);
    mock.onGet(apiUrls.users).reply(200, mockedReponseFromAxiosGetUsers);
    return store
      .dispatch(
        actions.toggleSearchType('user', 'anis', false, store.dispatch) as any
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('create  change type  with Search  user from local', async () => {
    const expectedActions = [
      {
        type: 'user',
        payload: 'anis',
      },
      {
        type: types.FetchListActions.LIST_LOADING,
        payload: null,
      },
      {
        type: types.FetchListActions.LOAD_FROM_LOCAL,
        payload: {
          searchBy: 'user',
          searchTerm: 'anis',
        },
      },
    ];
    const store = mockStore(initState);
    mock.onGet(apiUrls.users).reply(200, mockedReponseFromAxiosGetUsers);
    return store
      .dispatch(
        actions.toggleSearchType('user', 'anis', true, store.dispatch) as any
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('create  change type  with Search  repo from api', async () => {
    const expectedActions = [
      {
        type: 'repository',
        payload: 'theme',
      },
      {
        type: types.FetchListActions.LIST_LOADING,
        payload: 'theme',
      },
    ];
    const store = mockStore(initState);
    mock.onGet(apiUrls.users).reply(200, mockedReponseFromAxiosGetUsers);
    return store
      .dispatch(
        actions.toggleSearchType(
          'repository',
          'theme',
          false,
          store.dispatch
        ) as any
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('create  change type  with Search  repo from local', async () => {
    const expectedActions = [
      {
        type: 'repository',
        payload: 'theme',
      },
      {
        type: types.FetchListActions.LIST_LOADING,
        payload: null,
      },
      {
        type: types.FetchListActions.LOAD_FROM_LOCAL,
        payload: {
          searchBy: 'repository',
          searchTerm: 'theme',
        },
      },
    ];
    const store = mockStore(initState);
    return store
      .dispatch(
        actions.toggleSearchType(
          'repository',
          'theme',
          true,
          store.dispatch
        ) as any
      )
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});

const testUserSearchFromApi = () => {
  const expectedActions = [
    {
      type: types.FetchListActions.LIST_LOADING,
      payload: 'anis',
    },
    {
      payload: payloadFromFetchUsersAPI,

      type: 'LIST_SUCCESS',
    },
  ];
  const store = mockStore(initState);
  mock.onGet(apiUrls.users).reply(200, mockedReponseFromAxiosGetUsers);
  return store
    .dispatch(actions.proceedSearch('anis', 'user', false) as any)
    .then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
};
