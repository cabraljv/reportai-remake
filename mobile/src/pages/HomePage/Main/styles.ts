import styled from 'styled-components/native';
export interface Props {
  color: string;
}
export const Container = styled.View`
  flex: 1;
  display: flex;
  background: #fff6f6;
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
