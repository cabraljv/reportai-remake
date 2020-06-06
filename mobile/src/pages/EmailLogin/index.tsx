import React, {useState} from 'react';
import {StatusBar} from 'react-native';
import {
  Container,
  Label,
  Input,
  InputContainer,
  ContinueButton,
  IconInput,
  Header,
  Title,
  HeaderImage,
  BackButton,
  ForgetPasswordButton,
  FPText,
  SingUpButton,
  SUText,
} from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import api from '../../services/api';

const EmailLogin: React.FC = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async () => {
    try {
      const response = await api.post('/session', {
        email,
        password,
      });
      console.log(response.data);
    } catch (error) {
      if (error.response.status === 401) {
        alert('Email ou senha incorretos');
      }
    }
  };
  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#fff6f6"
        translucent
      />
      <BackButton onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" color="#ff5f5f" size={40} />
      </BackButton>
      <Header>
        <Title>Entrar no ReportAí</Title>
        <HeaderImage
          resizeMode="contain"
          source={require('../../assets/images/loginTrashImage.png')}
        />
      </Header>
      <InputContainer>
        <Label>EMAIL</Label>
        <Input
          placeholder="Seu email vem aqui"
          onChangeText={(text) => setEmail(text.trim())}
        />
        <IconInput>
          <Icon name="mail-outline" color="#B4B4B4" size={25} />
        </IconInput>
      </InputContainer>
      <InputContainer>
        <Label>SENHA</Label>
        <IconInput>
          <Icon name="navigate-next" color="#B4B4B4" size={25} />
        </IconInput>
        <Input
          secureTextEntry
          placeholder="Sua senha vem aqui"
          onChangeText={(text) => setPassword(text.trim())}
        />
      </InputContainer>
      <ForgetPasswordButton>
        <FPText>Esqueci minha senha</FPText>
      </ForgetPasswordButton>
      <SingUpButton>
        <SUText>Cadastre-se</SUText>
      </SingUpButton>
      <ContinueButton onPress={handleLogin}>
        <Icon name="navigate-next" color="#fff" size={50} />
      </ContinueButton>
    </Container>
  );
};

export default EmailLogin;
