import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';
import {Dimensions} from 'react-native';
const width = Dimensions.get('window').width;
export const Container = styled.View`
  flex: 1;
  background: #fff6f6;
`;
export const BackButton = styled.TouchableOpacity`
  margin: 40px 30px;
`;
export const Header = styled.View`
  flex-direction: row;
  margin: 0 30px;
  align-items: center;
  justify-content: space-between;
`;
export const Title = styled.Text`
  font-family: 'NotoSans-Bold';
  color: #ff5f5f;
  font-size: ${RFValue(24)}px;
  width: ${width * 0.4}px;
`;
export const HeaderImage = styled.Image``;
export const Content = styled.View`
  margin: 30px 30px;
  flex-direction: row;
`;
export const ContributorItem = styled.View`
  margin-top: 20px;
`;
export const IFMGImage = styled.Image``;
export const ContributorName = styled.Text`
  font-family: 'NotoSans-Regular';
  font-size: ${RFValue(20)}px;
  color: #333;
`;
export const ContributorEmail = styled.Text`
  font-family: 'NotoSans-Regular';
  font-size: ${RFValue(12)}px;
  color: #555;
`;
export const SideView = styled.View`
  margin-left: auto;
`;
export const IFMGTitle = styled.Text`
  font-family: 'NotoSans-Regular';
  font-size: ${RFValue(18)}px;
  color: #333;
  width: 180px;
`;
