import React, {useState, useEffect} from 'react';

import {
  Container,
  Header,
  TopBar,
  BackButton,
  Title,
  ReportsStats,
  DescriptionText,
  Content,
  ReportItem,
  ReportImage,
  ReportItemContent,
  ReportContentHeader,
  ReportCategory,
  ReportDate,
  ReportContentStatus,
  ReportContentStatusText,
  ReportContentStatusValue,
  RemoveButton,
  RemoveButtonText,
} from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {StatusBar, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import api from '../../services/api';
import {format} from 'date-fns';

interface IReport {
  id: number;
  description: string;
  img_path: string;
  created_at: string;
  category: {
    name: string;
  };
  status: {
    description: string;
    created_at: string;
  }[];
}
const MyReports: React.FC = () => {
  const navigation = useNavigation();
  const [inAnalysis, setInAnalysis] = useState(0);
  const [finished, setFinished] = useState(0);
  const [reports, setReports] = useState<IReport[]>();
  async function getDataFromAPI() {
    try {
      const response = await api.get<IReport[]>('/report');
      setReports(response.data);

      let aux = response.data.filter(
        (item) => item.status[0].description === 'EM ANÁLISE'
      );
      setInAnalysis(aux.length);
      aux = response.data.filter(
        (item) => item.status[0].description === 'CONCLUIDO'
      );
      setFinished(aux.length);
    } catch (error) {
      console.log(error.response.data);
    }
  }
  useEffect(() => {
    getDataFromAPI();
  }, []);
  async function handleRemove(id: number) {
    try {
      async function deleteReport() {
        await api.delete(`/report/${id}`);
        await getDataFromAPI();
        Alert.alert('Sucesso', 'Report removido com sucesso');
      }
      Alert.alert(
        'Sair',
        'Voce realmente deseja sair da aplicação?',
        [
          {
            text: 'Sim',
            onPress: deleteReport,
          },
          {
            text: 'Cancelar',
            style: 'cancel',
          },
        ],
        {cancelable: true}
      );
    } catch (error) {
      console.log(error.response.data);
    }
  }

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
          <DescriptionText color="#F6F976">
            EM ANÁLISE:{inAnalysis}
          </DescriptionText>
          <DescriptionText color="#5FFF79">
            CONCLUÍDO:{finished}
          </DescriptionText>
        </ReportsStats>
      </Header>
      <Content>
        {reports &&
          reports.map((item) => (
            <ReportItem key={item.id}>
              <ReportImage
                source={{
                  uri: item.img_path,
                }}
              />
              <ReportItemContent>
                <ReportContentHeader>
                  <ReportCategory>{item.category.name}</ReportCategory>
                  <ReportDate>
                    {format(new Date(item.created_at), 'dd/MM/yyy')}
                  </ReportDate>
                </ReportContentHeader>
                <ReportContentStatus>
                  <ReportContentStatusText>STATUS:</ReportContentStatusText>
                  <ReportContentStatusValue>
                    {item.status[0].description}
                  </ReportContentStatusValue>
                </ReportContentStatus>
                <RemoveButton onPress={() => handleRemove(item.id)}>
                  <RemoveButtonText>Remover</RemoveButtonText>
                </RemoveButton>
              </ReportItemContent>
            </ReportItem>
          ))}
      </Content>
    </Container>
  );
};

export default MyReports;
