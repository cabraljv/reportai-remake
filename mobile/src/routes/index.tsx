import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import HomePage from '../pages/HomePage';
import EmailLogin from '../pages/EmailLogin';
import DrawerRoute from './DrawerMain';
import AddReport from '../pages/AddReport';

const Stack = createStackNavigator();

const mainStack = () => (
  <NavigationContainer>
    <Stack.Navigator
      headerMode="none"
      screenOptions={{
        cardOverlayEnabled: true,
        gestureEnabled: true,
        ...TransitionPresets.SlideFromRightIOS,
      }}
      initialRouteName="AddReport">
      <Stack.Screen name="HomePage" component={HomePage} />
      <Stack.Screen name="EmailLogin" component={EmailLogin} />
      <Stack.Screen name="DrawerRoute" component={DrawerRoute} />
      <Stack.Screen name="AddReport" component={AddReport} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default mainStack;
