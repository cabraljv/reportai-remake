import React from 'react';

import {Container} from './styles';
import Ripples from 'react-ripples';
interface Props {
  onClickMenu: () => void;
}

const Header: React.FC<Props> = ({onClickMenu}) => {
  return (
    <Container>
      <Ripples>
        <button>
          <img
            src={require('../../assets/images/burgerMenu.svg')}
            alt="open menu"
            onClick={() => onClickMenu()}
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
