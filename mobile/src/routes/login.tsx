import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';

import Main from '../pages/HomePage/Main';
import EmailLogin from '../pages/HomePage/EmailLogin';

const Stack = createStackNavigator();

const loginStack = () => (
  <Stack.Navigator
    headerMode="none"
    screenOptions={{
      cardOverlayEnabled: true,
      gestureEnabled: true,
      ...TransitionPresets.SlideFromRightIOS,
    }}>
    <Stack.Screen name="LoginOptions" component={Main} />
    <Stack.Screen name="EmailLogin" component={EmailLogin} />
  </Stack.Navigator>
);

export default loginStack;
