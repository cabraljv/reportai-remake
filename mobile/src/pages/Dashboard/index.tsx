import React, {useRef, useEffect, useState} from 'react';

import {StatusBar, Animated} from 'react-native';
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
  IconReport,
  AddReportButtonContainer,
} from './styles';
import {Modalize} from 'react-native-modalize';
import Icon from 'react-native-vector-icons/MaterialIcons';
import api from '../../services/api';
import MapView, {Marker} from 'react-native-maps';
import {format} from 'date-fns';

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
  status: {
    description: string;
    createdAt: string;
  }[];
}

const Dashboard: React.FC<Props> = ({navigation}) => {
  const [coords, setCoords] = useState([0, 0]);
  const [reports, setReports] = useState<IReport[]>();
  const [selectedReport, setSelectedReport] = useState<IReport>();
  const buttonPosition = useRef(new Animated.Value(0)).current;
  const modalizeRef = useRef<Modalize>(null);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        setCoords([position.coords.longitude, position.coords.latitude]);
      },
      (error) => console.log(error),
      {timeout: 5000, enableHighAccuracy: true}
    );
    const willFocusSubscription = navigation.addListener('focus', async () => {
      await getReportsFromAPI();
    });
    return () => {
      willFocusSubscription();
    };
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
    Animated.timing(buttonPosition, {
      toValue: -400,
      useNativeDriver: true,
      duration: 800,
    }).start();
  };
  const onCloseModal = () => {
    modalizeRef.current?.close();
    Animated.timing(buttonPosition, {
      toValue: 0,
      useNativeDriver: true,
      duration: 1100,
    }).start();
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
        zoomControlEnabled={false}
        customMapStyle={require('../../assets/maps/style.json')}
        provider="google"
        loadingIndicatorColor="#ff5f5f"
        loadingEnabled
        zoomEnabled={false}
        showsPointsOfInterest={false}
        region={{
          latitude: coords[1],
          longitude: coords[0],
          latitudeDelta: 0.012,
          longitudeDelta: 0.011,
        }}
        initialRegion={{
          latitude: coords[1],
          longitude: coords[0],
          latitudeDelta: 0.012,
          longitudeDelta: 0.011,
        }}>
        {reports &&
          reports.map((item) => (
            <Marker
              onPress={() => {
                setSelectedReport(item);
                onOpenModal();
              }}
              key={item.id}
              coordinate={{
                latitude: item.latitude,
                longitude: item.longitude,
              }}>
              <IconReport source={{uri: item.category.icon_path}} />
            </Marker>
          ))}
      </MapView>
      <AddReportButtonContainer
        style={{transform: [{translateY: buttonPosition}]}}>
        <AddReportButton onPress={() => navigation.push('AddReport', {coords})}>
          <Icon name="add" color="#fff" size={50} />
        </AddReportButton>
      </AddReportButtonContainer>
      <Modalize
        ref={modalizeRef}
        scrollViewProps={{
          showsVerticalScrollIndicator: false,
        }}
        snapPoint={400}
        overlayStyle={{backgroundColor: 'transparent'}}
        adjustToContentHeight
        useNativeDriver
        onClose={() => {
          Animated.timing(buttonPosition, {
            toValue: 0,
            useNativeDriver: true,
            duration: 500,
          }).start();
        }}
        openAnimationConfig={{
          timing: {duration: 1000},
        }}
        closeAnimationConfig={{
          timing: {duration: 1000},
        }}
        modalStyle={{borderTopRightRadius: 40, borderTopLeftRadius: 40}}
        withHandle={false}>
        <ModalContainer>
          <CloseModalButton onPress={() => onCloseModal()}>
            <Icon name="expand-more" color="#ff5f5f" size={40} />
          </CloseModalButton>
          <ReportHeader>
            <ReportImage source={{uri: selectedReport?.img_path}} />
            <ReportHeaderSideContent>
              <ReportTitle>{selectedReport?.category.name}</ReportTitle>
              <ReportCreateText>
                Cadastrado em{' '}
                {selectedReport?.createdAt &&
                  format(new Date(selectedReport?.createdAt), 'dd/MM/yyy')}
              </ReportCreateText>
              <ReportStatusText>
                Status:{' '}
                <ReportStatusContent>
                  {selectedReport?.status[0].description}
                </ReportStatusContent>
              </ReportStatusText>
              <ReportUpdateText>
                Ultima atualização{' '}
                {selectedReport?.status[0].createdAt &&
                  format(
                    new Date(selectedReport?.status[0].createdAt),
                    'dd/MM/yyy'
                  )}
              </ReportUpdateText>
            </ReportHeaderSideContent>
          </ReportHeader>
          <ReportContent>{selectedReport?.description}</ReportContent>
        </ModalContainer>
      </Modalize>
    </Container>
  );
};

export default Dashboard;
