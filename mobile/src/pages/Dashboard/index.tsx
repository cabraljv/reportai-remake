import React, {useRef, useEffect, useState} from 'react';

import {StatusBar} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

import {
  Container,
  OpenDrawerButton,
  OpenDrawerIcon,
  ModalContainer,
  ReportImage,
  ReportTitle,
  ReportStatusText,
  ReportStatusContent,
  ReportHeaderSideContent,
  ReportUpdateText,
  ReportHeader,
  ReportCreateText,
  ReportContent,
  CloseModalButton,
  AddReportButton,
} from './styles';
import {Modalize} from 'react-native-modalize';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';
import MapView from 'react-native-maps';

interface Props {
  navigation: any;
}

interface IReport {
  category: {
    icon_path: string;
    name: string;
  };
  createdAt: string;
  description: string;
  img_path: string;
  latitude: number;
  longitude: number;
  id: number;
}

const Dashboard: React.FC<Props> = ({navigation}) => {
  const [coords, setCoords] = useState([0, 0]);
  const [reports, setReports] = useState<IReport[]>();
  const [selectedRepert, setSelectedReport] = useState<IReport>();
  const modalizeRef = useRef<Modalize>(null);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        setCoords([position.coords.longitude, position.coords.latitude]);
      },
      (error) => console.log(error),
      {timeout: 5000}
    );
  }, []);
  async function getReportsFromAPI() {
    const response = await api.get<IReport[]>(
      `/geolocation?latitude=${coords[1]}&longitude=${coords[0]}`
    );
    setReports(response.data);
  }
  useEffect(() => {
    getReportsFromAPI();
  }, [coords]);
  const onOpenModal = () => {
    modalizeRef.current?.open();
  };
  return (
    <Container>
      <StatusBar backgroundColor="transparent" translucent />
      <OpenDrawerButton onPress={() => navigation.openDrawer()}>
        <OpenDrawerIcon source={require('../../assets/images/burgerRed.png')} />
      </OpenDrawerButton>
      <MapView
        style={{flex: 1}}
        showsUserLocation
        zoomControlEnabled
        showsPointsOfInterest={false}
        provider="google"
        showsBuildings={false}
        loadingIndicatorColor="#ff5f5f"
        showsIndoors={false}
        loadingEnabled
        followsUserLocation
        showsCompass
        initialRegion={{
          latitude: coords[1],
          longitude: coords[0],
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}></MapView>
      <AddReportButton onPress={() => navigation.push('AddReport', {coords})}>
        <Icon name="add" color="#fff" size={50} />
      </AddReportButton>
      <Modalize
        ref={modalizeRef}
        scrollViewProps={{showsVerticalScrollIndicator: false}}
        snapPoint={400}
        overlayStyle={{backgroundColor: 'transparent'}}
        adjustToContentHeight
        openAnimationConfig={{
          timing: {duration: 1000},
        }}
        closeAnimationConfig={{
          timing: {duration: 1000},
        }}
        modalStyle={{borderTopRightRadius: 40, borderTopLeftRadius: 40}}
        withHandle={false}>
        <ModalContainer>
          <CloseModalButton onPress={() => modalizeRef.current?.close()}>
            <Icon name="expand-more" color="#ff5f5f" size={40} />
          </CloseModalButton>
          <ReportHeader>
            <ReportImage source={{uri: selectedRepert?.img_path}} />
            <ReportHeaderSideContent>
              <ReportTitle>{selectedRepert?.category.name}</ReportTitle>
              <ReportCreateText>Cadastrado em 25/05/2020</ReportCreateText>
              <ReportStatusText>
                Status: <ReportStatusContent>EM ANÁLISE</ReportStatusContent>
              </ReportStatusText>
              <ReportUpdateText>Ultima atualização 27/05/2020</ReportUpdateText>
            </ReportHeaderSideContent>
          </ReportHeader>
          <ReportContent>{selectedRepert?.description}</ReportContent>
        </ModalContainer>
      </Modalize>
    </Container>
  );
};

export default Dashboard;
