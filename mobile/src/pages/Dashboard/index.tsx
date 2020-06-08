import React, {useRef, useEffect, useState} from 'react';
import MapboxGL from '@react-native-mapbox-gl/maps';
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
import {MAPBOX_KEY} from 'react-native-dotenv';
interface Props {
  navigation: any;
}

MapboxGL.setAccessToken(MAPBOX_KEY);
MapboxGL.setConnected(true);
const Dashboard: React.FC<Props> = ({navigation}) => {
  const [coords, setCoords] = useState([0, 0]);
  const modalizeRef = useRef<Modalize>(null);
  useEffect(() => {
    MapboxGL.setTelemetryEnabled(false);
    Geolocation.getCurrentPosition(
      (position) => {
        setCoords([position.coords.longitude, position.coords.latitude]);
      },
      (error) => console.log(error),
      {timeout: 5000}
    );
  }, []);
  /* const onOpen = () => {
    modalizeRef.current?.open();
  };*/
  return (
    <Container>
      <StatusBar backgroundColor="transparent" translucent />
      <OpenDrawerButton onPress={() => navigation.openDrawer()}>
        <OpenDrawerIcon source={require('../../assets/images/burgerRed.png')} />
      </OpenDrawerButton>
      <MapboxGL.MapView
        style={{flex: 1}}
        zoomEnabled
        logoEnabled={false}
        styleURL="mapbox://styles/cabraljv/ckan4arq92git1inyy1ezq4jb"
        attributionEnabled={false}
        compassViewPosition={3}>
        <MapboxGL.Camera centerCoordinate={coords} zoomLevel={14} />
        <MapboxGL.UserLocation />
      </MapboxGL.MapView>
      <AddReportButton>
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
          <CloseModalButton>
            <Icon name="expand-more" color="#ff5f5f" size={40} />
          </CloseModalButton>
          <ReportHeader>
            <ReportImage
              source={require('../../assets/images/trashimage.png')}
            />
            <ReportHeaderSideContent>
              <ReportTitle>Lixo</ReportTitle>
              <ReportCreateText>Cadastrado em 25/05/2020</ReportCreateText>
              <ReportStatusText>
                Status: <ReportStatusContent>EM ANÁLISE</ReportStatusContent>
              </ReportStatusText>
              <ReportUpdateText>Ultima atualização 27/05/2020</ReportUpdateText>
            </ReportHeaderSideContent>
          </ReportHeader>
          <ReportContent>
            Tem lixo na praia a dias, esta atrapalhando o fluxo de pessoas e
            pode até mesmo trazer doenças para a população local
          </ReportContent>
        </ModalContainer>
      </Modalize>
    </Container>
  );
};

export default Dashboard;
