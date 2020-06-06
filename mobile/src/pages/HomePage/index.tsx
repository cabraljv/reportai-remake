import React from 'react';
import {StatusBar} from 'react-native';
import {useNavigation} from '@react-navigation/native';
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
  SocialButton,
  LeftIndicator,
  Icon,
  BtnText,
} from './styles';
export interface Props {
  color: string;
}
const HomePage: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <StatusBar backgroundColor="transparent" translucent />
      <BackgroundImage source={require('../../assets/images/background.png')} />
      <Header>
        <Logo source={require('../../assets/images/logoRed.png')} />
        <Title>ReportAí</Title>
        <SubTitle>Você fiscalizando a cidade</SubTitle>
      </Header>
      <Footer>
        <FooterBg source={require('../../assets/images/loginBg.png')} />
        <FooterContent>
          <SocialButton color="#5F6FFF">
            <LeftIndicator color="#4154FF">
              <Icon source={require('../../assets/images/facebookIcon.png')} />
            </LeftIndicator>
            <BtnText>Login com o Facebook</BtnText>
          </SocialButton>
          <SocialButton color="#fff">
            <LeftIndicator color="#F6F6F6">
              <Icon source={require('../../assets/images/googleIcon.png')} />
            </LeftIndicator>
            <BtnText style={{color: '#555555'}}>Login com o Google</BtnText>
          </SocialButton>
          <SocialButton
            color="#FF5F5F"
            onPress={() => {
              navigation.navigate('EmailLogin');
            }}>
            <LeftIndicator color="#FF4D4D">
              <Icon source={require('../../assets/images/emailIcon.png')} />
            </LeftIndicator>
            <BtnText>Login com o Email</BtnText>
          </SocialButton>
        </FooterContent>
      </Footer>
    </Container>
  );
};

export default HomePage;
