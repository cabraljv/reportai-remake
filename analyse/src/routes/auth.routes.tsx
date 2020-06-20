import React from 'react';
import {Route} from 'react-router-dom';

import Login from '../pages/Login';
const notFound: React.FC = () => <h1>Essa página não existe</h1>;
export default function AuthRoutes() {
  return (
    <>
      <Route path="/" exact component={Login} />
      <Route component={notFound} />
    </>
  );
}
