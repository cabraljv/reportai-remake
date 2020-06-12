import React from 'react';

import {
  Container,
  Header,
  TopBar,
  BackButton,
  Title,
  ReportsStats,
  DescriptionText,
} from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {StatusBar} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const MyReports: React.FC = () => {
  const navigation = useNavigation();
  return (
    <Container>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="transparent"
      />
      <Header>
        <TopBar>
          <BackButton onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" color="#fff" size={35} />
          </BackButton>
          <Title>Meus Reports</Title>
        </TopBar>
        <ReportsStats>
          <DescriptionText color="#ECECEC">EM ANDAMENTO:0</DescriptionText>
          <DescriptionText color="#F6F976">EM ANÁLISE:1</DescriptionText>
          <DescriptionText color="#5FFF79">CONCLUÍDO:2</DescriptionText>
        </ReportsStats>
      </Header>
    </Container>
  );
};

export default MyReports;
