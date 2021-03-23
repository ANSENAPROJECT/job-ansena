import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import reducers from './Reducers';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
};

const logger = createLogger();

const enhancers = applyMiddleware(promiseMiddleware, logger);

const persistedReducer = persistReducer(persistConfig, reducers, enhancers);

const store = createStore(persistedReducer);

export default store;
