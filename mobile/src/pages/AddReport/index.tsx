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
  SubmitButton,
  BtnText,
} from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Picker} from '@react-native-community/picker';
import ImagePicker from 'react-native-image-picker';
interface IReportImage {
  uri: string;
  type?: string;
  name: string;
}
interface IImagePreview {
  uri: string;
}
const categoies = [
  {
    label: 'Lixo',
    value: 1,
  },
  {
    label: 'Poste',
    value: 2,
  },
  {
    label: 'Árvore',
    value: 3,
  },
];
const AddReport: React.FC = () => {
  const [imagePreview, setImagePreview] = useState<IImagePreview>();
  const [reportImage, setReportImage] = useState<IReportImage>();
  const [reportType, setReportType] = useState<number | string>();
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
        backgroundColor="#FFF6F6"
        translucent={false}
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
              setReportType(itemValue);
            }}>
            {categoies.map((item) => (
              <Picker.Item
                label={item.label}
                value={item.value}
                key={item.value}
              />
            ))}
          </Picker>
        </ReportPickerContainer>
      </ItemField>
      <SubmitButton>
        <BtnText>ENVIAR</BtnText>
      </SubmitButton>
    </Container>
  );
};

export default AddReport;
