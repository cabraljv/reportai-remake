import React from 'react';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import {useAuth} from '../hooks/auth';
import {View} from 'react-native';
const Routes: React.FC = () => {
  const {signed, loading} = useAuth();
  if (loading) {
    return <View></View>;
  }
  return signed ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
