import React, {useEffect} from 'react';
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
  SocialButton,
  LeftIndicator,
  Icon,
  BtnText,
} from './styles';
import {GoogleSignin} from '@react-native-community/google-signin';
import {useAuth} from '../../hooks/auth';
import {WEB_CLIENT_ID} from 'react-native-dotenv';
export interface Props {
  color: string;
}

const HomePage: React.FC = () => {
  const {signIn} = useAuth();
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID, // client ID of type WEB for your server(needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    });
  }, []);
  const signInGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const info = await GoogleSignin.signIn();
      signIn('google', info.idToken || '');
    } catch (error) {}
  };
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
          <SocialButton color="#fff" onPress={() => signInGoogle()}>
            <LeftIndicator color="#F6F6F6">
              <Icon source={require('../../assets/images/googleIcon.png')} />
            </LeftIndicator>
            <BtnText style={{color: '#555555'}}>Login com o Google</BtnText>
          </SocialButton>
        </FooterContent>
      </Footer>
    </Container>
  );
};

export default HomePage;
