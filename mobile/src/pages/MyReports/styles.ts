import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';

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
  font-size: ${RFValue(22)}px;
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
  font-size: ${RFValue(14)}px;
`;
export const Content = styled.ScrollView`
  flex: 1;
`;
export const ReportItem = styled.View`
  background: #fff;
  margin: 10px 30px;
  border-radius: 10px;
  elevation: 5;
  height: 100px;
  flex-direction: row;
`;
export const ReportImage = styled.Image`
  height: 100px;
  width: 100px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;
export const ReportContentHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
export const ReportItemContent = styled.View`
  margin: 0 20px;
  flex: 1;
`;
export const ReportCategory = styled.Text`
  font-size: ${RFValue(25)}px;
  font-family: 'NotoSans-Bold';
  color: #ff5f5f;
`;
export const ReportDate = styled.Text`
  font-size: ${RFValue(13)}px;
  font-family: 'NotoSans-Regular';
  color: #888;
`;
export const ReportContentStatus = styled.View`
  flex-direction: row;
`;
export const ReportContentStatusText = styled.Text`
  font-family: 'NotoSans-Bold';
  font-size: ${RFValue(16)}px;
  color: #333;
`;
export const ReportContentStatusValue = styled.Text`
  font-family: 'NotoSans-Bold';
  font-size: ${RFValue(16)}px;
  color: #888;
`;
export const RemoveButton = styled.TouchableOpacity`
  align-self: flex-end;
  margin-top: auto;
  margin-bottom: 10px;
`;
export const RemoveButtonText = styled.Text`
  font-family: 'NotoSans-Regular';
  color: #ff5f5f;
`;
