import React from 'react';
import {BrowserRouter} from 'react-router-dom';
// import './config/reactotronConfig';
import Routes from './routes';
import GlobalStyle from './styles/global';
import {AuthProvider} from './hooks/auth';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify';
const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};

export default App;
