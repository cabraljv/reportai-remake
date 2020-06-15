import React from 'react';
import {useAuth} from '../../hooks/auth';
const Map: React.FC = () => {
  const {signOut} = useAuth();
  return (
    <div>
      <h1>Map Page</h1>
      <button onClick={() => signOut()}>SAIR</button>
    </div>
  );
};

export default Map;
