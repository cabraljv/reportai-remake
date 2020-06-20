import React from 'react';

import {Container} from './styles';
import {MdDashboard, MdMap, MdPeople, MdExitToApp} from 'react-icons/md';
import {useSideBar} from '../../hooks/sidebar';
import {Link} from 'react-router-dom';
import Ripple from 'react-ripples';
import {useAuth} from '../../hooks/auth';

const SideMenu: React.FC = () => {
  const {open} = useSideBar();
  const {signOut} = useAuth();

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
      <button onClick={signOut}>
        <MdExitToApp size={30} color="#858585" />
        <p>Sair</p>
      </button>
    </Container>
  );
};

export default SideMenu;
