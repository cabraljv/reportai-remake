import styled from 'styled-components/native';
interface Props {
  color?: string;
}
export const Container = styled.View`
  flex: 1;
  background: #ffcbcb;
`;
export const Header = styled.View`
  background: #ff5f5f;
  padding: 10px 30px;
  elevation: 5;
`;
export const TopBar = styled.View`
  flex-direction: row;
  margin-top: 25px;
  align-items: center;
`;
export const BackButton = styled.TouchableOpacity``;
export const Title = styled.Text`
  color: #fff;
  font-family: 'NotoSans-Regular';
  font-size: 22px;
  margin-left: 60px;
`;
export const ReportsStats = styled.View`
  flex-direction: row;
  margin: 20px 0;
  margin-top: 35px;
`;
export const DescriptionText = styled.Text`
  margin-right: 10px;
  font-family: 'NotoSans-Bold';
  color: ${(props: Props) => props.color};
`;
