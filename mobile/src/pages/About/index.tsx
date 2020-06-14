import React from 'react';

import {
  Container,
  BackButton,
  Header,
  Title,
  HeaderImage,
  Content,
  IFMGImage,
  ContributorName,
  ContributorItem,
  ContributorEmail,
  SideView,
  IFMGTitle,
} from './styles';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const About: React.FC = () => {
  const navigation = useNavigation();
  return (
    <Container>
      <BackButton onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" color="#ff5f5f" size={35} />
      </BackButton>
      <Header>
        <Title>Um pouco sobre nós</Title>
        <HeaderImage
          source={require('../../assets/images/aboutScreenBg.png')}
        />
      </Header>
      <Content>
        <IFMGImage source={require('../../assets/images/ifAboutScreen.png')} />
        <SideView>
          <IFMGTitle>Instituto Federal de Minas Gerais</IFMGTitle>
          <ContributorItem>
            <ContributorName>João Victor</ContributorName>
            <ContributorEmail>joaovictorcabral.dev@gmail.com</ContributorEmail>
          </ContributorItem>
          <ContributorItem>
            <ContributorName>João Victor</ContributorName>
            <ContributorEmail>joaovictorcabral.dev@gmail.com</ContributorEmail>
          </ContributorItem>
        </SideView>
      </Content>
    </Container>
  );
};

export default About;
