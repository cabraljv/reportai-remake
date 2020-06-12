import styled from 'styled-components/native';
import {Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
export interface Props {
  isImage?: boolean;
}
export const Container = styled.ScrollView`
  flex: 1;
  background: #fff6f6;
`;
export const Header = styled.View`
  flex-direction: row;
  margin: 0 30px;
  margin-top: 10px;
  margin-bottom: 20px;
  justify-content: space-between;
  align-items: center;
`;
export const Title = styled.Text`
  font-family: 'NotoSans-Bold';
  font-size: 26px;
  width: 50%;
  color: #ff5f5f;
`;
export const HeaderImage = styled.Image``;
export const BackButton = styled.TouchableOpacity`
  align-self: flex-start;
  margin: 5px 30px;
  margin-top: 10px;
`;
export const ItemField = styled.View`
  margin: 0 ${(props: Props) => (props.isImage ? 'auto' : '30px')};
  margin-bottom: 30px;
`;
export const Label = styled.Text`
  font-family: 'NotoSans-Bold';
  font-size: 12px;
  color: #ff5f5f;
`;
export const ImageField = styled.TouchableOpacity`
  width: ${0.7 * windowWidth}px;
  height: ${0.7 * windowWidth}px;
  border: 3px solid #ff5f5f;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`;
export const AddImageIcon = styled.Image``;
export const ImagePreviewItem = styled.Image`
  width: ${0.7 * windowWidth}px;
  height: ${0.7 * windowWidth}px;
`;
export const DescriptionInput = styled.TextInput`
  width: 100%;
  height: 170px;
  background: #fff;
  elevation: 5;
  padding: 10px;
  border-radius: 10px;
`;
export const ReportPickerContainer = styled.View`
  border: 2px solid #ff5f5f;
  border-radius: 8px;
  padding: 2px;
`;
export const SubmitButton = styled.TouchableOpacity`
  margin: 15px 30px;
  padding: 12px;
  background: #ff5f5f;
  border-radius: 10px;
  elevation: 5;
`;
export const BtnText = styled.Text`
  font-family: 'NotoSans-Bold';
  letter-spacing: 3px;
  color: #fff;
  text-align: center;
  font-size: 18px;
`;
