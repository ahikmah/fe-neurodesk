import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import { useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

const enhancers = applyMiddleware(thunk);
// ==============================|| REDUX - MAIN STORE ||============================== //

const store = createStore(reducer, enhancers);
const persistor = persistStore(store);

const { dispatch } = store;
const useDispatch = () => useAppDispatch();
const useSelector = useAppSelector;
export { store, persistor, dispatch, useSelector, useDispatch };
