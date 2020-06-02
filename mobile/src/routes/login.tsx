import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Main from '../pages/HomePage/Main';

const Stack = createStackNavigator();

const loginStack = () => (
  <Stack.Navigator headerMode="none">
    <Stack.Screen name="LoginOptions" component={Main} />
  </Stack.Navigator>
);

export default loginStack;
