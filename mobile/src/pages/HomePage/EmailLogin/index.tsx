import React from 'react';

import {
  Container,
  Label,
  Input,
  InputContainer,
  ContinueButton,
  IconInput,
} from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

const EmailLogin: React.FC = () => {
  return (
    <Container>
      <InputContainer>
        <Label>EMAIL</Label>
        <Input placeholder="Seu email vem aqui" />
        <IconInput>
          <Icon name="mail-outline" color="#B4B4B4" size={25} />
        </IconInput>
      </InputContainer>
      <InputContainer>
        <Label>SENHA</Label>
        <IconInput>
          <Icon name="navigate-next" color="#B4B4B4" size={25} />
        </IconInput>
        <Input placeholder="Sua senha vem aqui" />
      </InputContainer>
      <ContinueButton>
        <Icon name="navigate-next" color="#fff" size={50} />
      </ContinueButton>
    </Container>
  );
};

export default EmailLogin;
