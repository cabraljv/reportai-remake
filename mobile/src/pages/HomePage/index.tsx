import React from 'react';
import {StatusBar} from 'react-native';

import {
  Container,
  BackgroundImage,
  Header,
  Logo,
  Title,
  SubTitle,
  Footer,
  FooterBg,
  FooterContent,
} from './styles';

import background from '../../assets/images/background.png';
import logo from '../../assets/images/logoRed.png';
import footerBackground from '../../assets/images/loginBg.png';
import LoginRoutes from '../../routes/login';

const HomePage: React.FC = () => {
  return (
    <Container>
      <StatusBar backgroundColor="transparent" translucent />
      <BackgroundImage source={background} />
      <Header>
        <Logo source={logo} />
        <Title>ReportAí</Title>
        <SubTitle>Você fiscalizando a cidade</SubTitle>
      </Header>
      <Footer>
        <FooterBg source={footerBackground} />
        <FooterContent>
          <LoginRoutes />
        </FooterContent>
      </Footer>
    </Container>
  );
};

export default HomePage;
