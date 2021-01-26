import { createStore, applyMiddleware } from 'redux';
import RootReducer from './root.reducer';
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

export type RootStore = ReturnType<typeof RootReducer>;

