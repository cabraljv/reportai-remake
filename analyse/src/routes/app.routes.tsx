import React from 'react';
import {Route} from 'react-router-dom';

import Header from '../components/Header';
import SideMenu from '../components/SideMenu';
import {SideBarProvider} from '../hooks/sidebar';
import Map from '../pages/Map';
import Dashboard from '../pages/Dashboard';

export default function AppRoutes() {
  return (
    <>
      <SideBarProvider>
        <Header />
        <SideMenu />
      </SideBarProvider>
      <div style={{marginTop: 65}}>
        <Route path="/" exact component={Map} />
        <Route path="/dashboard" component={Dashboard} />
      </div>
    </>
  );
}
