import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #fff;
`;
export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 20px 10px;
  margin-left: 40px;
  margin-bottom: 50px;
`;
export const Title = styled.Text`
  text-align: center;
  color: #ff5f5f;
  font-family: 'NotoSans-Bold';
  font-size: 20px;
`;
export const DrawerButton = styled.TouchableOpacity``;
export const DrawerIcon = styled.Image``;
export const ItemDrawer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
  margin-left: 15px;
`;
export const ItemIcon = styled.Image`
  width: 22px;
  height: 22px;
`;
export const ItemName = styled.Text`
  font-size: 16px;
  font-family: 'NotoSans-Regular';
  margin-left: 10px;
`;
