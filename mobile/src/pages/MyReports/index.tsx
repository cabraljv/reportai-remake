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
import {StatusBar} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import api from '../../services/api';
import {format} from 'date-fns';

interface IReport {
  id: number;
  description: string;
  img_path: string;
  createdAt: string;
  category: {
    name: string;
  };
  status: {
    description: string;
    createdAt: string;
  }[];
}
const MyReports: React.FC = () => {
  const navigation = useNavigation();
  const [inAnalysis, setInAnalysis] = useState(0);
  const [inProgress, setInProgress] = useState(0);
  const [finished, setFinished] = useState(0);
  const [reports, setReports] = useState<IReport[]>();

  useEffect(() => {
    async function getDataFromAPI() {
      try {
        const response = await api.get<IReport[]>('/report');
        setReports(response.data);

        let aux = response.data.filter(
          (item) => item.status[0].description === 'EM ANÁLISE'
        );
        setInAnalysis(aux.length);
        aux = response.data.filter(
          (item) => item.status[0].description === 'EM ANDAMENTO'
        );
        setInProgress(aux.length);
        aux = response.data.filter(
          (item) => item.status[0].description === 'CONCLUIDO'
        );
        setFinished(aux.length);
      } catch (error) {
        console.log(error.response.data);
      }
    }

    getDataFromAPI();
  }, []);

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
          <DescriptionText color="#ECECEC">
            EM ANDAMENTO: {inProgress}
          </DescriptionText>
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
                    {format(new Date(item.createdAt), 'dd/MM/yyy')}
                  </ReportDate>
                </ReportContentHeader>
                <ReportContentStatus>
                  <ReportContentStatusText>STATUS:</ReportContentStatusText>
                  <ReportContentStatusValue>
                    {item.status[0].description}
                  </ReportContentStatusValue>
                </ReportContentStatus>
                <RemoveButton>
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
