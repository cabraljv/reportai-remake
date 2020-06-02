import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #fff6f6;
  align-items: center;
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
  z-index: 5;
`;
export const ContinueButton = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  border-radius: 30px;
  background: #ff5f5f;
  margin: auto 20px 20px auto;
  elevation: 5;
`;
export const IconInput = styled.View`
  position: absolute;
  top: 30px;
  z-index: 10;
  background: #f00;
`;
