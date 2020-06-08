import React from 'react';
// eslint-disable-next-line no-unused-vars
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import {
  Container,
  Header,
  Title,
  DrawerButton,
  DrawerIcon,
  ItemDrawer,
  ItemIcon,
  ItemName,
} from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
const Drawer: React.FC<DrawerContentComponentProps> = () => {
  return (
    <Container>
      <Header>
        <Title>ReportAí</Title>
        <DrawerButton>
          <DrawerIcon source={require('../../assets/images/burgerRed.png')} />
        </DrawerButton>
      </Header>
      <ItemDrawer>
        <ItemIcon
          source={require('../../assets/images/reportaiIconDrawer.png')}
        />
        <ItemName>Meus Reports</ItemName>
      </ItemDrawer>
      <ItemDrawer>
        <ItemIcon source={require('../../assets/images/ifIconDrawer.png')} />
        <ItemName>IFMG</ItemName>
      </ItemDrawer>
      <ItemDrawer>
        <Icon name="info-outline" size={23} color="#545454" />
        <ItemName>Sobre</ItemName>
      </ItemDrawer>
      <ItemDrawer style={{marginTop: 'auto'}}>
        <Icon name="exit-to-app" size={23} color="#545454" />
        <ItemName>Sair</ItemName>
      </ItemDrawer>
    </Container>
  );
};

export default Drawer;
