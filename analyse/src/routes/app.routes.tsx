import React, {useState} from 'react';
import {Route} from 'react-router-dom';

import Map from '../pages/Map';
import Header from '../components/Header';
import SideMenu from '../components/SideMenu';

export default function AppRoutes() {
  const [sideOpen, setSideOpen] = useState(false);
  return (
    <>
      <Header onClickMenu={() => setSideOpen(!sideOpen)} />
      <SideMenu opened={sideOpen} />
      <div style={{marginTop: 65}}>
        <Route path="/" exact component={Map} />
      </div>
    </>
  );
}
