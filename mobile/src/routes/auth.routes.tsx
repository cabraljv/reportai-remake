import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import HomePage from '../pages/HomePage';
const AuthStack = createStackNavigator();

const AuthRoutes = () => (
  <AuthStack.Navigator
    headerMode="none"
    screenOptions={{
      cardOverlayEnabled: true,
      gestureEnabled: true,
      ...TransitionPresets.SlideFromRightIOS,
    }}
    initialRouteName="HomePage">
    <AuthStack.Screen name="HomePage" component={HomePage} />
  </AuthStack.Navigator>
);

export default AuthRoutes;
