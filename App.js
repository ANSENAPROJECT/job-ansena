import React, {useState} from 'react';
import Router from './src/Router';

//Redux
import {Provider} from 'react-redux';
import store from './src/public/redux/store';

//Redux-persist
import {PersistGate} from 'redux-persist/es/integration/react';
import {persistStore} from 'redux-persist';

import NotifService from './NotifService';

import PushNotification from 'react-native-push-notification';
import {Platform} from 'react-native';

const persistedStore = persistStore(store);

const App = () => {
  const [registerToken, setRegisterToken] = useState('');
  const [fcmRegistered, setFcmRegistered] = useState(false);

  const onRegister = (token) => {
    setRegisterToken(token.token);
    setFcmRegistered(true);
  };

  const onNotif = (notif) => {
    // Alert.alert(notif.title, notif.message);
    notification.localNotif(notif);
  };

  const notification = new NotifService(onRegister, onNotif);

  // console.log('ini token ada di APp js', registerToken);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore}>
        <Router registerToken={registerToken} />
      </PersistGate>
    </Provider>
  );
};

export default App;
