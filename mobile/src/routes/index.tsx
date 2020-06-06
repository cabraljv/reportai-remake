import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import HomePage from '../pages/HomePage';
import EmailLogin from '../pages/EmailLogin';

const Stack = createStackNavigator();

const mainStack = () => (
  <NavigationContainer>
    <Stack.Navigator
      headerMode="none"
      screenOptions={{
        cardOverlayEnabled: true,
        gestureEnabled: true,
        ...TransitionPresets.SlideFromRightIOS,
      }}>
      <Stack.Screen name="HomePage" component={HomePage} />
      <Stack.Screen name="EmailLogin" component={EmailLogin} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default mainStack;
