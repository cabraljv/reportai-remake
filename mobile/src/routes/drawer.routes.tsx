import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

import DrawerNavigator from '../components/Drawer';
import Dashboard from '../pages/Dashboard';
import MyReports from '../pages/MyReports';
import About from '../pages/About';

const Drawer = createDrawerNavigator();

function DrawerMain() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <DrawerNavigator {...props} />}
      drawerStyle={{
        width: 200,
      }}
      initialRouteName="Dashboard">
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="MyReports" component={MyReports} />
      <Drawer.Screen name="About" component={About} />
    </Drawer.Navigator>
  );
}

export default function SingUp() {
  return <DrawerMain />;
}
