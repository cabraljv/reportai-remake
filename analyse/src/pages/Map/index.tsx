import React, {useEffect, useState} from 'react';

import {Container, MapContainer, Marker} from './styles';
import GoogleMapReact from 'google-map-react';
import api from '../../services/api';
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
interface IMarker {
  lat: number;
  lng: number;
}
const Map: React.FC = () => {
  const [reports, setReports] = useState<IReport[]>();
  useEffect(() => {
    async function getDataFromAPI() {
      try {
        const response = await api.get<IReport[]>('/analyse/reports');
        setReports(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getDataFromAPI();
  }, []);
  return (
    <Container>
      <MapContainer>
        <GoogleMapReact
          defaultCenter={{lat: -20.412525, lng: -42.892159}}
          bootstrapURLKeys={{key: process.env.REACT_APP_MAP_KEY || ''}}
          defaultZoom={14}
          options={{
            styles: require('../../assets/map/style.json'),
          }}></GoogleMapReact>
      </MapContainer>
      <aside>
        <p>Filtros</p>
      </aside>
    </Container>
  );
};

export default Map;
