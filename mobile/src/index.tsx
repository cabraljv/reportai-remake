import React from 'react';
import 'react-native-gesture-handler';
import Routes from './routes';
import {NavigationContainer} from '@react-navigation/native';
import {AuthProvider} from './hooks/auth';
const App: React.FC = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
};

export default App;
