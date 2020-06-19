import React from 'react';

import {Container} from './styles';
import Ripples from 'react-ripples';
import {useSideBar} from '../../hooks/sidebar';

const Header: React.FC = () => {
  const {changeState} = useSideBar();
  return (
    <Container>
      <Ripples>
        <button>
          <img
            src={require('../../assets/images/burgerMenu.svg')}
            alt="open menu"
            onClick={changeState}
          />
        </button>
      </Ripples>
      <div>
        <img src={require('../../assets/images/whiteLogo.svg')} alt="logo" />
        <h1>Analyse</h1>
      </div>
      <h2>Ponte Nova</h2>
    </Container>
  );
};

export default Header;
