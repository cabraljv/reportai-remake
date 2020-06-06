import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #fff6f6;
  align-items: center;
  justify-content: center;
`;
export const Label = styled.Text`
  font-size: 12px;
  font-family: 'NotoSans-Bold';
  color: #ff5f5f;
`;
export const InputContainer = styled.View`
  margin: 5px 0;
  width: 85%;
`;
export const Input = styled.TextInput`
  background: #fff;
  elevation: 5;
  width: 100%;
  border-radius: 10px;
  padding: 0 20px;
  height: 55px;
  font-size: 16px;
`;
export const ContinueButton = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  border-radius: 30px;
  background: #ff5f5f;
  position: absolute;
  bottom: 30px;
  right: 30px;
  elevation: 5;
`;
export const IconInput = styled.View`
  position: absolute;
  top: 30px;
  z-index: 10;
  background: #f00;
`;
export const Header = styled.View`
  flex-direction: row;
  margin: 10% 20px;
`;
export const Title = styled.Text`
  font-family: 'NotoSans-Bold';
  font-size: 30px;
  width: 160px;
  margin-right: -50px;
  color: #ff5f5f;
`;
export const HeaderImage = styled.Image`
  width: 60%;
`;
export const BackButton = styled.TouchableOpacity`
  align-self: flex-start;
  margin: 5px 30px;
  margin-top: 40px;
`;
export const ForgetPasswordButton = styled.TouchableOpacity`
  align-self: flex-end;
  margin-right: 30px;
  margin-bottom: auto;
`;
export const FPText = styled.Text`
  font-family: 'NotoSans-Regular';
  font-size: 14px;
  color: #787474;
`;
export const SingUpButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 30px;
  left: 30px;
`;
export const SUText = styled.Text`
  font-family: 'NotoSans-Regular';
  font-size: 18px;
  color: #787474;
`;
