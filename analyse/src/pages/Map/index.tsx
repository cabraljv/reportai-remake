import React, {useEffect, useState} from 'react';

import {
  Container,
  MapContainer,
  Marker,
  DatePickerStyled,
  Select,
  Filters,
  ReportDetails,
} from './styles';
import GoogleMapReact from 'google-map-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import {format, isAfter, isBefore} from 'date-fns';
import api from '../../services/api';
interface IReport {
  category: {
    id: number;
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
interface IReportCategoryRequest {
  id: number;
  name: string;
}
interface IReactSelect {
  value: string;
  label: string;
}
interface ICustomDatePicker {
  value: Date;
  onClick: () => void;
}

const Map: React.FC = () => {
  const [reports, setReports] = useState<IReport[]>();
  const [initialDate, setInitialDate] = useState<Date>();
  const [finalDate, setFinalDate] = useState<Date>();
  const [reportCategories, setReportCategories] = useState<IReactSelect[]>();
  const [filtredReports, setFiltredReports] = useState<IReport[]>();
  const [selectedCategories, setSelectedCategories] = useState<
    IReactSelect[]
  >();
  const [selectedReport, setSelectedReport] = useState<IReport>();

  useEffect(() => {
    async function getReportsFromAPI() {
      try {
        const response = await api.get<IReport[]>('/analyse/reports');
        setReports(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    async function getCategoriesFromAPI() {
      try {
        const response = await api.get<IReportCategoryRequest[]>('/categories');
        const aux = response.data.map<IReactSelect>((item) => ({
          value: `${item.id}`,
          label: item.name,
        }));
        setReportCategories(aux);
      } catch (error) {
        console.log(error);
      }
    }
    getReportsFromAPI();
    getCategoriesFromAPI();
  }, []);
  useEffect(() => {
    let nMarkers: IReport[] = reports || [];
    if (selectedCategories === null) {
      nMarkers = [];
    } else {
      if (selectedCategories) {
        let filtred: IReport[] = [];
        selectedCategories.forEach((item) => {
          const aux2 = nMarkers.filter(
            (report) => `${report.category.id}` === item.value
          );
          filtred = filtred.concat(aux2);
        });
        nMarkers = filtred;
      }
    }
    if (initialDate) {
      const filtred = nMarkers.filter((item) =>
        isAfter(new Date(item.createdAt), initialDate)
      );
      nMarkers = filtred;
    }
    if (finalDate) {
      const filtred = nMarkers.filter((item) =>
        isBefore(new Date(item.createdAt), finalDate)
      );
      nMarkers = filtred;
    }
    setFiltredReports(nMarkers);
  }, [selectedCategories, initialDate, finalDate, reports]);
  function handleResetFilters() {
    setInitialDate(undefined);
    setFinalDate(undefined);
    setSelectedCategories(reportCategories);
  }
  return (
    <Container>
      <MapContainer>
        <GoogleMapReact
          defaultCenter={{lat: -20.413017, lng: -42.903714}}
          bootstrapURLKeys={{key: process.env.REACT_APP_MAP_KEY || ''}}
          defaultZoom={14}
          options={{
            styles: require('../../assets/map/style.json'),
          }}>
          {filtredReports &&
            filtredReports.map((item) => (
              <Marker
                lat={item.latitude}
                lng={item.longitude}
                key={item.id}
                onClick={() => setSelectedReport(item)}>
                <img src={item.category.icon_path} alt="report category" />
              </Marker>
            ))}
        </GoogleMapReact>
      </MapContainer>
      <aside>
        {selectedReport ? (
          <ReportDetails>
            <header>
              <section>
                <span>Categoria:</span>
                <h3>{selectedReport.category.name}</h3>
              </section>
              <p>
                Cadastrado em{' '}
                {format(new Date(selectedReport.createdAt), 'dd/MM/yyy')}
              </p>
            </header>
            <section>
              <img src={selectedReport.img_path} alt="report image" />
            </section>
            <section>
              <span>DESCRIÇÃO:</span>
              <div>
                <p>{selectedReport.description}</p>
              </div>
            </section>
          </ReportDetails>
        ) : (
          <Filters>
            <h3>Filtros</h3>
            <section>
              <p>Por data:</p>
              <p>Data de início</p>
              <DatePicker
                dateFormat="dd/MM/yyyy"
                selected={initialDate}
                maxDate={finalDate}
                onChange={(date) => date && setInitialDate(date)}
                customInput={
                  <DatePickerStyled>
                    <p>
                      {initialDate
                        ? format(initialDate, 'dd/MM/yyyy')
                        : 'dd/MM/yyyy'}
                    </p>
                  </DatePickerStyled>
                }
              />
              <p>Data de fim</p>
              <DatePicker
                dateFormat="dd/MM/yyyy"
                selected={finalDate}
                minDate={initialDate}
                onChange={(date) => date && setFinalDate(date)}
                customInput={
                  <DatePickerStyled>
                    <p>
                      {finalDate
                        ? format(finalDate, 'dd/MM/yyyy')
                        : 'dd/MM/yyyy'}
                    </p>
                  </DatePickerStyled>
                }
              />
            </section>
            <section>
              <p>Por categoria:</p>
              {reportCategories && (
                <Select
                  defaultValue={reportCategories}
                  options={reportCategories}
                  isMulti
                  onChange={(selections: IReactSelect[]) =>
                    setSelectedCategories(selections)
                  }
                />
              )}
            </section>
            <button onClick={handleResetFilters}>RESTAURAR</button>
          </Filters>
        )}
      </aside>
    </Container>
  );
};

export default Map;
