import React, {useRef} from 'react';
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
} from './styles';
import {Modalize} from 'react-native-modalize';
import {Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
interface Props {
  navigation: any;
}

const Dashboard: React.FC<Props> = ({navigation}) => {
  const modalizeRef = useRef<Modalize>(null);

  const onOpen = () => {
    modalizeRef.current?.open();
  };
  return (
    <Container>
      <OpenDrawerButton onPress={() => navigation.openDrawer()}>
        <OpenDrawerIcon source={require('../../assets/images/burgerRed.png')} />
      </OpenDrawerButton>
      <TouchableOpacity onPress={onOpen} style={{marginTop: 100}}>
        <Text>Open the modal</Text>
      </TouchableOpacity>
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
