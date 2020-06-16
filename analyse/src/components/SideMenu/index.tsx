import React from 'react';

import {Container} from './styles';
import {MdDashboard, MdMap, MdPeople} from 'react-icons/md';
import {useSideBar} from '../../hooks/sidebar';
import {Link} from 'react-router-dom';
import Ripple from 'react-ripples';

const SideMenu: React.FC = () => {
  const {open} = useSideBar();

  return (
    <Container open={open}>
      <Ripple>
        <Link to="/dashboard">
          <MdDashboard size={30} color="#858585" />
          <p>Dashboard</p>
        </Link>
      </Ripple>
      <Ripple>
        <Link to="/">
          <MdMap size={30} color="#858585" />
          <p>Mapa</p>
        </Link>
      </Ripple>
      <Ripple>
        <Link to="/">
          <MdPeople size={30} color="#858585" />
          <p>Usuários</p>
        </Link>
      </Ripple>
    </Container>
  );
};

export default SideMenu;
