import React, {useState, useEffect} from 'react';
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
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Picker} from '@react-native-community/picker';
import ImagePicker from 'react-native-image-picker';
import api from '../../services/api';
import * as Yup from 'yup';

interface IReportImage {
  uri: string;
  type?: string;
  name: string;
}
interface IImagePreview {
  uri: string;
}

interface ICategory {
  label: string;
  value: number;
}
interface ICategoryFromAPI {
  name: string;
  id: number;
}
interface IRoute {
  params: {
    coords: number[];
  };
}
const AddReport: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<IRoute>();
  const [imagePreview, setImagePreview] = useState<IImagePreview>();
  const [reportImage, setReportImage] = useState<IReportImage>();
  const [reportType, setReportType] = useState<number | string>();
  const [categories, setCategories] = useState<ICategory[]>();
  const [reportDesc, setReportDesc] = useState('');

  useEffect(() => {
    async function getDataFromAPI() {
      const response = await api.get<ICategoryFromAPI[]>('categories');
      const categoriesResponse = response.data.map((item) => ({
        label: item.name,
        value: item.id,
      }));
      setCategories(categoriesResponse);
    }
    getDataFromAPI();
  }, []);

  const handleSubmit = async () => {
    const schema = Yup.object().shape({
      description: Yup.string().required().min(2),
    });
    if (reportImage && (await schema.validate({description: reportDesc}))) {
      const data = new FormData();
      data.append('image', reportImage);
      data.append('description', reportDesc);
      data.append('category', reportType);
      data.append('latitude', route.params.coords[1]);
      data.append('longitude', route.params.coords[0]);
      try {
        const response = await api.post('report', data);

        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    } else {
    }
  };

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
      <BackButton onPress={() => navigation.goBack()}>
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
          onChangeText={(text) => setReportDesc(text.trim())}
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
            {categories?.map((item) => (
              <Picker.Item
                label={item.label}
                value={item.value}
                key={item.value}
              />
            ))}
          </Picker>
        </ReportPickerContainer>
      </ItemField>
      <SubmitButton onPress={handleSubmit}>
        <BtnText>ENVIAR</BtnText>
      </SubmitButton>
    </Container>
  );
};

export default AddReport;
