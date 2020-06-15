import React from 'react';

import {Container} from './styles';
import {MdDashboard, MdMap, MdPeople} from 'react-icons/md';
interface Props {
  opened: boolean;
}

const SideMenu: React.FC<Props> = ({opened}) => {
  return (
    <Container opened={opened}>
      <button>
        <MdDashboard size={30} color="#858585" />
        <p>Dashboard</p>
      </button>
      <button>
        <MdMap size={30} color="#858585" />
        <p>Mapa</p>
      </button>
      <button>
        <MdPeople size={30} color="#858585" />
        <p>Usuários</p>
      </button>
    </Container>
  );
};

export default SideMenu;
