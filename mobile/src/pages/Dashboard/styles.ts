import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: #ffcbcb;
`;
export const OpenDrawerButton = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  background: #fff;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 40px;
  left: 30px;
  elevation: 4;
  z-index: 10;
`;
export const OpenDrawerIcon = styled.Image``;

export const ModalContainer = styled.View`
  margin: 10px 30px;
  height: 400px;
`;
export const ReportImage = styled.Image`
  width: 180px;
  height: 180px;
  border-radius: 10px;
`;
export const ReportTitle = styled.Text`
  font-family: 'NotoSans-Bold';
  font-size: 36px;
  color: #ff5f5f;
`;
export const ReportStatusText = styled.Text`
  font-family: 'NotoSans-Regular';
  font-size: 18px;
`;
export const ReportStatusContent = styled.Text`
  font-family: 'NotoSans-Bold';
  color: #ffcb44;
`;
export const ReportUpdateText = styled.Text`
  font-family: 'NotoSans-Light';
  color: #6d6d6d;
  font-size: 12px;
`;
export const ReportHeader = styled.View`
  flex-direction: row;
`;
export const ReportCreateText = styled.Text`
  font-family: 'NotoSans-Regular';
  color: #6d6d6d;
  font-size: 12px;
  margin-top: -10px;
  margin-bottom: 10px;
`;
export const ReportHeaderSideContent = styled.View`
  margin-left: 10px;
`;
export const ReportContent = styled.Text`
  font-family: 'NotoSans-Regular';
  font-size: 16px;
  color: #3d3d3d;
  margin-top: 30px;
`;
export const CloseModalButton = styled.TouchableOpacity`
  align-self: center;
`;
export const AddReportButton = styled.TouchableOpacity`
  width: 70px;
  height: 70px;
  background: #ff5f5f;
  border-radius: 50px;
  position: absolute;
  right: 30px;
  bottom: 30px;
  elevation: 5;
  align-items: center;
  justify-content: center;
`;
export const IconReport = styled.Image`
  width: 40px;
  height: 63px;
  z-index: 5;
`;
