import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// reducer import
import dashboardReducer from './slices/dashboard';
import ticketReducer from './slices/ticket';
import userReducer from './slices/user';
import menuReducer from './slices/menu';
import searchReducer from './slices/search';
import snackbarReducer from './slices/snackbar';

const persistConfig = {
  key: 'root',
  storage,
};

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  dashboard: dashboardReducer,
  ticket: ticketReducer,
  user: userReducer,
  menu: menuReducer,
  search: searchReducer,
  snackbar: snackbarReducer,
});

export default persistReducer(persistConfig, reducer);
