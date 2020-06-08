import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import DrawerNavigator from '../../components/Drawer';
import Dashboard from '../../pages/Dashboard';

const Drawer = createDrawerNavigator();

function DrawerMain() {
  return (
    <Drawer.Navigator
      drawerContent={DrawerNavigator}
      drawerStyle={{
        width: 200,
      }}
      initialRouteName="Dashboard">
      <Drawer.Screen name="Dashboard" component={Dashboard} />
    </Drawer.Navigator>
  );
}

export default function SingUp() {
  return <DrawerMain />;
}
