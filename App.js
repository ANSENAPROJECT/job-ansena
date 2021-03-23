import React from 'react';
import Router from './src/Router';

//Redux
import {Provider} from 'react-redux';
import store from './src/public/redux/store';

//Redux-persist
import {PersistGate} from 'redux-persist/es/integration/react';
import {persistStore} from 'redux-persist';

const persistedStore = persistStore(store);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <Router />
      </PersistGate>
    </Provider>
  );
};

export default App;
