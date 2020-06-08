import React, {useState} from 'react';
import {StatusBar} from 'react-native';
import {
  Container,
  Header,
  Title,
  HeaderImage,
  BackButton,
  ItemField,
  Label,
  ImageField,
  AddImageIcon,
  ImagePreviewItem,
  DescriptionInput,
  ReportPickerContainer,
} from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Picker} from '@react-native-community/picker';
interface IReportImage {
  uri: string;
  type?: string;
  name: string;
}
interface IImagePreview {
  uri: string;
}
const AddReport: React.FC = () => {
  const [imagePreview, setImagePreview] = useState<IImagePreview>();
  const [reportImage, setReportImage] = useState<IReportImage>();
  const [reportType, setReportType] = useState('');
  const handleSelectImage = () => {
    ImagePicker.showImagePicker(
      {
        title: 'Selecionar imagem',
        takePhotoButtonTitle: 'Abrir câmera',
        chooseFromLibraryButtonTitle: 'Selecionar na galeria',
        mediaType: 'photo',
        quality: 0.4,
      },
      (upload) => {
        if (upload.error) {
        } else if (upload.didCancel) {
        } else {
          const preview = {
            uri: `data:image/jpeg;base64,${upload.data}`,
          };

          let prefix;
          let ext;

          if (upload.fileName) {
            [prefix, ext] = upload.fileName.split('.');
            ext = ext.toLowerCase() === 'png' ? ext : 'png';
          } else {
            prefix = new Date().getTime();
            ext = 'png';
          }

          const image = {
            uri: upload.uri,
            type: upload.type,
            name: `${prefix}.${ext}`,
          };
          setImagePreview(preview);
          setReportImage(image);
        }
      }
    );
  };
  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <BackButton>
        <Icon name="arrow-back" color="#ff5f5f" size={40} />
      </BackButton>
      <Header>
        <Title>Adicionar Report</Title>
        <HeaderImage
          source={require('../../assets/images/addReportImage.png')}
        />
      </Header>
      <ItemField isImage>
        <Label>ADICIONAR IMAGEM</Label>
        {imagePreview === undefined ? (
          <ImageField onPress={handleSelectImage}>
            <AddImageIcon
              source={require('../../assets/images/addImage.png')}
            />
          </ImageField>
        ) : (
          <ImagePreviewItem source={imagePreview} />
        )}
      </ItemField>
      <ItemField>
        <Label>DESCRIÇÃO</Label>
        <DescriptionInput
          multiline
          textAlignVertical="top"
          placeholder="Uma breve descrição do problema"
        />
      </ItemField>
      <ItemField>
        <ReportPickerContainer>
          <Picker
            style={{color: '#ff5f5f'}}
            selectedValue={reportType}
            mode="dropdown"
            onValueChange={(itemValue, itemIndex) => {
              setReportType(itemValue.toString());
              console.log(reportType);
            }}>
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
          </Picker>
        </ReportPickerContainer>
      </ItemField>
    </Container>
  );
};

export default AddReport;
