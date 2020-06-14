import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #fff6f6;
`;
export const BackButton = styled.TouchableOpacity`
  margin: 40px 30px;
`;
export const Header = styled.View`
  flex-direction: row;
  margin: 0 50px;
  align-items: center;
  justify-content: space-between;
`;
export const Title = styled.Text`
  font-family: 'NotoSans-Bold';
  color: #ff5f5f;
  font-size: 24px;
  width: 150px;
`;
export const HeaderImage = styled.Image``;
export const Content = styled.View`
  margin: 30px 50px;
  flex-direction: row;
`;
export const ContributorItem = styled.View`
  margin-top: 20px;
`;
export const IFMGImage = styled.Image``;
export const ContributorName = styled.Text`
  font-family: 'NotoSans-Regular';
  font-size: 22px;
  color: #333;
`;
export const ContributorEmail = styled.Text`
  font-family: 'NotoSans-Regular';
  font-size: 12px;
  color: #555;
`;
export const SideView = styled.View`
  margin-left: auto;
`;
export const IFMGTitle = styled.Text`
  font-family: 'NotoSans-Regular';
  font-size: 18px;
  color: #333;
  width: 180px;
`;
