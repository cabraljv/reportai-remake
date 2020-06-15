import React from 'react';
import {Route} from 'react-router-dom';

import Map from '../pages/Map';

export default function AppRoutes() {
  return (
    <>
      <Route path="/" exact component={Map} />
    </>
  );
}
