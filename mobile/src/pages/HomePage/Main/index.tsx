import React from 'react';

import {Container, SocialButton, LeftIndicator, Icon, BtnText} from './styles';
import facebookIcon from '../../../assets/images/facebookIcon.png';
import googleIcon from '../../../assets/images/googleIcon.png';
import emailIcon from '../../../assets/images/emailIcon.png';

export interface Props {
  color: string;
}
const Main: React.FC = ({navigation}) => {
  return (
    <Container>
      <SocialButton color="#5F6FFF">
        <LeftIndicator color="#4154FF">
          <Icon source={facebookIcon} />
        </LeftIndicator>
        <BtnText>Login com o Facebook</BtnText>
      </SocialButton>
      <SocialButton color="#fff">
        <LeftIndicator color="#F6F6F6">
          <Icon source={googleIcon} />
        </LeftIndicator>
        <BtnText style={{color: '#555555'}}>Login com o Google</BtnText>
      </SocialButton>
      <SocialButton
        color="#FF5F5F"
        onPress={() => navigation.push('EmailLogin')}>
        <LeftIndicator color="#FF4D4D">
          <Icon source={emailIcon} />
        </LeftIndicator>
        <BtnText>Login com o Email</BtnText>
      </SocialButton>
    </Container>
  );
};

export default Main;
