import React from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import DrawerRoute from './drawer.routes';
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
      initialRouteName="DrawerRoute">
      <Stack.Screen name="DrawerRoute" component={DrawerRoute} />
      <Stack.Screen name="AddReport" component={AddReport} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default mainStack;
