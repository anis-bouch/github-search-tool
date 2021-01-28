# Git Search tool

## Tools used in this project 

* React/Redux.
* Redux-Thunk.
* Axios
* Redux-Persist.
* Sass.
- - - -
## Folder Structure 
<details>
  <summary>Docs</summary>
  <p>contains a generated Html with typedoc, for code documentation (Types, Interfaces .....).</p>
</details>
<details>
  <summary>Public</summary>
  <p>Folder contains static elements.</p>
</details>
<details>
  <summary>src</summary>
  <p>Contains the source code of the app..</p>
  <details>
     <summary>__mocks__</summary>
     <p>contains all the mocks for testing the app.</p>
</details>
  <details>
  <summary>api</summary>
  <p>contains all the code necessary for communicating with the API (Axios lib )</p>
</details>
  <details>
  <summary>features</summary>
  <p>contains all the code responsible for the search logic feature (components, actions, reducer , types and tests)</p>
</details>
  <details>
  <summary>helpers</summary>
  <p>contains a file which provide global functions to be used as helpers to achieve a goal.</p>
</details>
   <details>
  <summary>layout</summary>
  <p>contains react components and their styles, to scafold the app layout and also static pages to be rendered in a special case like error or no results</p>
</details>
   <details>
  <summary>scss</summary>
  <p>sass global files</p>
</details>
</details>

- - - -

## Approach used for implementation 

### UI 
The layout contains: 
* The input text is a react component, represent an HTML input text. 
the flow is very simple, after typing more than 2 characters, action will be dispatched, a progress bar under the input will appear until the request is fulfilled. The outcome of this action depends on the response coming from Github API(or Local), 3 situations were handled: 
    * Success: a list (users or repository depends on the search params) will be shown.
    * Error: an error will appear under the search bar.
    * No Results: a no result component will appear in case the search will return no value.
* The Select box, also a react component that represents an Html select/option element.
the flow of the selection has a dependence on the value entered in the input field.
    * if the length of the string value is less than 3, action will be triggered to change the type of search from user to a repository and vice versa. (no impact on the UI).
    * if the length is equal to 3 or above, 2 actions will be triggered successively, the first will change the search to the type of search, the 2n one will trigger the search again.
* The list is a container for another react component, which is the card that holds the search data (User or Repository). it will show the search result based on the entered data (term and type) and then it will show either users or repository. 
- - - -
### Logic 
#### Scaffolding 

As we mentioned before the project was built with react/redux. 
The project config is as follows: 

***store.ts***
```
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { searchReducer } from './feature/search/state/search.reducer';
const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, searchReducer);
export const store = createStore( persistedReducer,
    composeWithDevTools(applyMiddleware(thunk)))
export const persistor = persistStore(store)
```

***the global state*** 

``` 
/**
 * global state, it's an interface that describes our global state structure.
 */
export interface GlobalState {
  usersToBeShown: User[]; //  users which will be shown in the list if search type is users
  repositoriesToBeShown: Repository[]; // repos which will be shown in the list if search tyoe is repo
  cachedUsers: User[]; // array of users which have been fetched from api before, concatinated with every new users come from API 
  cachedRepositories: Repository[]; // array of repos which have been fetched from api before, concatinated with every new repos come from API 
  previousSearchesUsers: string[]; // all the search terms to fetch users, which has  been entered before.
  previousSearchesRepositories: string[]; // all the search terms to fetch repos, which has  been entered before.
  searchType: string; // search type user or repository
  currentSearchTerm: string; // the current search term in the input field 
  loading: boolean; // flag to show loading in the ui 
  error: ApiError; // an object which holds the error data, in case the api returns an error
}

/**
 * API error is an interface that describes the object which will be sent to the reducer in case we get an API error
 */
export interface ApiError {
  code: number;
  message: string;
}
``` 

***index.ts***

```
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={''} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

```
- - - -
### App Flow
#### Typing the search term 
When the user is typing in the input text, and after a debounce effect of 800ms, a function will be dispatched, this function is a thunk action creator, the function has 2 logical branches, it will either do an API call to fetch data or fetch from local storage.

``` 
export const proceedSearch = (
  searchTerm: string,
  type: string,
  isCached: boolean
) =>
  isCached
    ? fetchDataFromLocalStorage(searchTerm, type)
    : fetchDataFromApi(searchTerm, type);
```
the 'isCached' param is the flag which will make the function go to  SPECIFIC LOGICAL branch, and it's determined from state like the following: 

``` 
state.searchType === searchByEnum.USERS
            ? !!state.previousSearchesUsers.includes(event.target.value)
            : !!state.previousSearchesRepositories.includes(event.target.value)
``` 
* if the entered term exists in our state (whether it's for user or repository) then isCached becomes true, and the function will call 'fetchDataFromLocalStorage(searchTerm, type)' which will return the actions: 

```
{
    type: FetchListActions.LIST_LOADING,
    payload: null,
}
```
and 
```
{
      type: FetchListActions.LOAD_FROM_LOCAL,
      payload: {
        searchTerm,
        searchBy: type,
}
```
Actions are  dispatched to our reducer, now the reducer will catch the first action and process it as following: 
```
case FetchListActions.LIST_LOADING: {
      return {
        ...state,
        loading: true,
        currentSearchTerm: action.payload ? action.payload : state.currentSearchTerm,
        error: {
          code:0,
          message: ''
        }
      };
    }
```
the reducer will update some fields in the state, and the most critical field in this code is the loading flag, cause it will be responsible for showing the progress bar in the UI.
Now,the reducer will catch the 2nd action, and process it as following: 
``` 
case FetchListActions.LOAD_FROM_LOCAL: {
      return {
        ...state,
        usersToBeShown:
          action.payload.searchBy === searchByEnum.USERS
            ? state.cachedUsers.filter((user) =>
                user.login.indexOf(action.payload.searchTerm) !== -1
              )
            : state.usersToBeShown,
        repositoriesToBeShown:
          action.payload.searchBy === searchByEnum.REPOSITORY
            ? state.cachedRepositories.filter((repo) =>
                repo.full_name.indexOf(action.payload.searchTerm) !== -1
              )
            : state.repositoriesToBeShown,
        loading: false,
        currentSearchTerm: action.payload.searchTerm,
        error: {
          code:0,
          message: ''
        }
      };
    }
```
the reducer will check if the current search type is user or repository, then based on that will it will choose to fill the userToBeshown or repositoriesToBeShown, from the cached data saved in our state. also, the loading will be false.

* Now if isCached is false, the ' fetchDataFromApi(searchTerm, type) ' will be called, and it will dispatch 2 actions, the loading action which we had seen before, and one of the following actions:  
   - if the Axios get method is successful
``` 
{
      type: FetchListActions.LIST_SUCCESS,
      payload: {
        searchBy: type,
        repos:
          type === searchByEnum.REPOSITORY ? dataFromRemote.data.items : [],
        users: type === searchByEnum.USERS ? dataFromRemote.data.items : [],
        searchTerm,
}
``` 
   - if an error occurred while fetching data from API
``` 
{
      type: FetchListActions.LIST_FAILED,
      payload: {
        code: 500,
        message: 'Oops, Something went Wrong',
        searchTerm,
}
```
Again the reducer will catch the actions and will process the loading action like this : 
``` 
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
        currentSearchTerm: action.payload.searchTerm,
        error: {
          code:0,
          message: ''
        }
      };
 ``` 
 the reducer will check the type of search, if its user or repository, and based on that, it will update => usersToBeShown or repositoriesToBeShown, then it will add the search term to either previousSearchesUsers or previousSearchesRepositories according to type, and finally, it will push the data into our cached arrays, cachedUsers or cachedRepositories. 


Up to this point, the search by typing logic is covered, and our state now can be updated successfully based on the entered data. 
- - - -

#### Change the search type 

When the user changes the type of search in the UI, a function `selectSearchType` will be called: 
``` 
const selectSearchType = (event: ChangeEvent<HTMLSelectElement>) => {
      console.log(event.target.value);
      
    dispatch(
      toggleSearchType(
        event.target.value,
        state.currentSearchTerm,
        !!state.previousSearchesUsers.find(
          (user) => user === state.currentSearchTerm
        ) &&
          !!state.previousSearchesRepositories.find(
            (repo) => repo === state.currentSearchTerm
          ),
        dispatch
      )
    );
  };
 ```
 which will call an action creator : 
 ``` 
 export const toggleSearchType = (
  type: string,
  searchTerm: string,
  isCached: boolean,
  dispatcher: Dispatch<any>
) =>
  searchTerm.length <= 2
    ? changedSearchType(type, searchTerm, false, isCached, dispatcher)
    : changedSearchType(type, searchTerm, true, isCached, dispatcher);
```
As you can see here, there is a parameter called dispatcher, actually its a work around (i know it's not the best solution) to dispatch an asynchronous function from another function inside the actions logic. So, the `toggleSearchType` will call a function : 
```
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
```
which will dispatch an action to change searchType , and if `shouldSearch` is true, it will dispatch the proceedSearch which have explained at the top.

Our reducer, will catch `{
    type,
    payload: searchTerm,
  }` and it will process it as the following: 
  
```
case searchByEnum.REPOSITORY:
      return {
        ...state,
        searchType: searchByEnum.REPOSITORY,
        currentSearchTerm: action.payload,
        error: {
          code:0,
          message: ''
        }
      };

    case searchByEnum.USERS:
      return {
        ...state,
        searchType: searchByEnum.USERS,
        currentSearchTerm: action.payload,
        error: {
          code:0,
          message: ''
        }
      };
``` 
based on which type of search the action dispatched, the reducer will update the searchType value in our state. plus the usual searchTerm and error update.

Now, to this point, the logic of changing searchType has been covered. 

----
#### Clear the list 

In this part, the flow is very simple, from our input component, whenever the onChange event is fired, we check if the searchTerm length < 3, we will call a function 
```
// from component
if (event.key === 'Backspace') {
        dispatch(clearList(element.value, state.searchType));
}

// from search.action.ts
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

```

and the reducer will process it as : 
```
case FetchListActions.CLEAR_LIST:
      return {
        ...state,
        searchType: action.payload.searchBy,
        currentSearchTerm: action.payload.searchTerm,
        usersToBeShown: [],
        repositoriesToBeShown: [],
        error: {
          code:0,
          message: ''
        }
      };
 ````
 as you can see both lists now are empty.
 
 ---- 
## More Info 
#### Styles 
- in this project, sass(scss) was used to write most of the styles in the app. it was written from scratch with no UI framework.
- external(found on codepen) scss were used (with customization)  for designing the card content, and the error page
     * [Card Design](https://codepen.io/FrankieDoodie/pen/NOJpVX "Card Design").
     * [Error Page](https://codepen.io/roguetue/pen/JLMXJp "Error page").
     
#### Documentation 
- The code documentation was generated by [Typedoc](https://typedoc.org "typedoc"). and it will be found under the docs folder. 

#### Testing 
For testing,  jest has been used and all the actions + reducer + API  logic was covered.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
