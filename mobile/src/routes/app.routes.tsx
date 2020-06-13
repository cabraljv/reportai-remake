import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import DrawerRoute from './drawer.routes';
import AddReport from '../pages/AddReport';
const Stack = createStackNavigator();

const mainStack = () => (
  <Stack.Navigator
    headerMode="none"
    screenOptions={{
      cardOverlayEnabled: true,
      gestureEnabled: true,
      ...TransitionPresets.SlideFromRightIOS,
    }}
    initialRouteName="DrawerRoute">
    <Stack.Screen name="DrawerRoute" component={DrawerRoute} />
    <Stack.Screen name="AddReport" component={AddReport} />
  </Stack.Navigator>
);

export default mainStack;
