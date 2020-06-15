import React from 'react';

import {Container} from './styles';
import {useGoogleLogin} from 'react-google-login';
import {useAuth} from '../../hooks/auth';

const Login: React.FC = () => {
  const {signIn} = useAuth();
  const {signIn: googleSignIn} = useGoogleLogin({
    clientId: process.env.REACT_APP_WEB_CLIENT_ID || '',
    onSuccess: (result) => {
      const aux = JSON.stringify(result);
      const aux2 = JSON.parse(aux);
      signIn('google', aux2.tokenId);
    },
    onFailure: (result) => {
      console.log(result);
    },
  });

  return (
    <Container>
      <div>
        <header>
          <h1>ReportAí Analyse</h1>
          <img src={require('../../assets/images/loginImage.svg')} alt="" />
        </header>
        <footer>
          <button id="googleButton" onClick={() => googleSignIn()}>
            <div>
              <img src={require('../../assets/images/googleIcon.svg')} alt="" />
            </div>
            <aside>
              <p>Login com o Google</p>
            </aside>
          </button>
          <button id="facebookButton">
            <div>
              <img
                src={require('../../assets/images/facebookIcon.svg')}
                alt=""
              />
            </div>
            <aside>
              <p>Login com o Facebook</p>
            </aside>
          </button>
        </footer>
      </div>
    </Container>
  );
};

export default Login;
