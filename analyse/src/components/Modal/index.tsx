import React from 'react';

import {Container} from './styles';
interface Props {
  open: boolean;
}
const Modal: React.FC<Props> = ({children, open}) => {
  return (
    <Container open={open}>
      <div>{children}</div>
    </Container>
  );
};

export default Modal;
