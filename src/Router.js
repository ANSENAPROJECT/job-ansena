import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {Easing} from 'react-native';
import 'react-native-gesture-handler';

import {connect} from 'react-redux';
import {deviceToken} from './public/redux/ActionCreators/token';
import AddJobGroup from './screens/addJobGroup';
import AddSubJob from './screens/addSubJob';
import Login from './screens/auth/login';
import Dashboard from './screens/dashboard';
import DetailAdmin from './screens/detailJob/detailAdmin';
import DetailUser from './screens/detailJob/detailUser';
import Splash from './screens/splash';
import ViewJob from './screens/viewJob';

const Stack = createStackNavigator();

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 50,
    mass: 3,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const closeConfig = {
  animation: 'timing',
  config: {
    duration: 500,
    easing: Easing.linear,
  },
};

const Router = ({registerToken, deviceTokenRedux}) => {
  useEffect(() => {
    deviceTokenRedux(registerToken);
  }, [registerToken]);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="splash"
          component={Splash}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="login"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="dashboard"
          component={Dashboard}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="addjobgroup"
          component={AddJobGroup}
          options={{
            headerShown: false,
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />
        <Stack.Screen
          name="addsubjob"
          component={AddSubJob}
          options={{
            headerShown: false,
            gestureEnabled: true,
            // gestureDirection: 'vertical',
            ...TransitionPresets.ModalSlideFromBottomIOS,
          }}
        />
        <Stack.Screen
          name="detailuser"
          component={DetailUser}
          options={{
            headerShown: false,
            gestureEnabled: true,
            // gestureDirection: 'vertical',
            ...TransitionPresets.ModalSlideFromBottomIOS,
          }}
        />
        <Stack.Screen
          name="detailadmin"
          component={DetailAdmin}
          options={{
            headerShown: false,
            gestureEnabled: true,
            // gestureDirection: 'vertical',
            ...TransitionPresets.ModalSlideFromBottomIOS,
          }}
        />
        <Stack.Screen
          name="viewjob"
          component={ViewJob}
          options={{
            headerShown: false,
            gestureEnabled: true,
            gestureDirection: 'horizontal',
            ...TransitionPresets.SlideFromRightIOS,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    deviceTokenRedux: (data) => dispatch(deviceToken(data)),
  };
};

export default connect(null, mapDispatchToProps)(Router);
