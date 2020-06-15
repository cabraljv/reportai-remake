import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import Routes from './routes';
import GlobalStyle from './styles/global';
import {AuthProvider} from './hooks/auth';

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </BrowserRouter>
    </>
  );
};

export default App;
