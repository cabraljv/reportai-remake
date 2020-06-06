import styled from 'styled-components/native';
import {Dimensions} from 'react-native';
const height = Dimensions.get('window').height;

export interface Props {
  color: string;
}

export const Container = styled.SafeAreaView`
  flex: 1;
  background: #fff;
  display: flex;
`;
export const BackgroundImage = styled.Image`
  position: absolute;
  top: 0;
  left: 0;
  transform: scale(1.5);
`;
export const Logo = styled.Image`
  margin: auto;
`;
export const Header = styled.View`
  margin: 0 auto;
  margin-top: 70px;
`;
export const Title = styled.Text`
  color: #ff5f5f;
  font-family: 'NotoSans-Bold';
  font-size: 40px;
  text-align: center;
`;
export const SubTitle = styled.Text`
  color: #fff;
  font-family: 'NotoSans-Light';
  font-size: 22px;
  text-align: center;
`;
export const Footer = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: ${height * 0.35}px;
  background: #fff6f6;
`;
export const FooterBg = styled.Image`
  position: absolute;
  top: -50px;
  left: 0;
  transform: scale(1.2);
`;
export const FooterContent = styled.View`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BtnText = styled.Text`
  color: #fff;
  font-size: 16px;
  width: 70%;
  text-align: center;
  font-family: 'NotoSans-Regular';
`;
export const Icon = styled.Image``;
export const LeftIndicator = styled.View`
  width: 60px;
  height: 100%;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  background: ${(props: Props) => props.color};
`;
export const SocialButton = styled.TouchableOpacity`
  background: ${(props: Props) => props.color};
  display: flex;
  flex-direction: row;
  width: 85%;
  height: 55px;
  border-radius: 20px;
  elevation: 5;
  align-items: center;
  margin: 5px 0;
`;
