import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// reducer import
import menuReducer from './slices/menu';
import searchReducer from './slices/search';
import snackbarReducer from './slices/snackbar';

const persistConfig = {
  key: 'root',
  whitelist: ['cart', 'filter'],
  blacklist: ['user', 'library', 'penalty', 'doctype', 'location', 'category', 'inventory', 'loan', 'external'],
  storage,
};

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  menu: menuReducer,
  search: searchReducer,
  snackbar: snackbarReducer,
});

export default persistReducer(persistConfig, reducer);
