import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import HomePage from '../pages/HomePage';

const Stack = createStackNavigator();

const mainStack = () => (
  <NavigationContainer>
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="HomePage" component={HomePage} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default mainStack;
