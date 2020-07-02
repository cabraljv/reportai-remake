import React, {useEffect, useState} from 'react';

import {
  Container,
  MapContainer,
  Marker,
  DatePickerStyled,
  Select,
  Filters,
  ReportDetails,
  Actions,
  ModalContent,
} from './styles';
import GoogleMapReact from 'google-map-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from '../../components/Modal';
import {toast} from 'react-toastify';
import {format, isAfter, isBefore} from 'date-fns';
import api from '../../services/api';
interface IReport {
  category: {
    id: number;
    icon_path: string;
    name: string;
  };
  created_at: string;
  description: string;
  img_path: string;
  latitude: number;
  longitude: number;
  id: number;
  status: {
    description: string;
    created_at: string;
    status_code: number;
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

const Map: React.FC = () => {
  const [reports, setReports] = useState<IReport[]>();
  const [initialDate, setInitialDate] = useState<Date>();
  const [finalDate, setFinalDate] = useState<Date>();
  const [reportCategories, setReportCategories] = useState<IReactSelect[]>();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const reportStatuses: IReactSelect[] = [
    {
      label: 'EM ANÁLISE',
      value: '1',
    },
    {
      label: 'CONCLUÍDO',
      value: '2',
    },
  ];
  const [filtredReports, setFiltredReports] = useState<IReport[]>();
  const [selectedCategories, setSelectedCategories] = useState<
    IReactSelect[]
  >();
  const [reportStatus, setReportStatus] = useState<IReactSelect>();
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
        isAfter(new Date(item.created_at), initialDate)
      );
      nMarkers = filtred;
    }
    if (finalDate) {
      const filtred = nMarkers.filter((item) =>
        isBefore(new Date(item.created_at), finalDate)
      );
      nMarkers = filtred;
    }
    setFiltredReports(nMarkers);
  }, [selectedCategories, initialDate, finalDate, reports]);
  async function handleDeleteReport() {
    try {
      await api.delete(`/analyse/reports/${selectedReport?.id}`);
      toast.success('Report deletado com sucesso');
    } catch (error) {
      toast.error('Ocorreu um erro ao deletar o report');
    }
    setDeleteModalOpen(false);
  }
  function handleResetFilters() {
    setInitialDate(undefined);
    setFinalDate(undefined);
    setSelectedCategories(reportCategories);
  }
  return (
    <>
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
                  onClick={() => {
                    setSelectedReport(item);
                    setReportStatus({
                      label: item.status[0].description,
                      value: `${item.status[0].status_code}`,
                    });
                  }}>
                  <img src={item.category.icon_path} alt="report category" />
                </Marker>
              ))}
          </GoogleMapReact>
        </MapContainer>
        <aside>
          {selectedReport ? (
            <>
              <ReportDetails>
                <header>
                  <section>
                    <span>Categoria:</span>
                    <h3>{selectedReport.category.name}</h3>
                  </section>
                  <p>
                    Cadastrado em{' '}
                    {format(new Date(selectedReport.created_at), 'dd/MM/yyy')}
                  </p>
                </header>
                <section>
                  <img src={selectedReport.img_path} alt="report" />
                </section>
                <section>
                  <span>DESCRIÇÃO:</span>
                  <div>
                    <p>{selectedReport.description}</p>
                  </div>
                </section>
              </ReportDetails>
              <Actions>
                <h3>Ações</h3>
                <section>
                  <p>ALTERAR STATUS</p>
                  <Select
                    defaultValue={reportStatus}
                    options={reportStatuses}
                    onChange={(selection: IReactSelect) =>
                      setReportStatus(selection)
                    }
                  />
                </section>
                <button id="delete" onClick={() => setDeleteModalOpen(true)}>
                  DELETAR
                </button>
                <button>SALVAR</button>
              </Actions>
            </>
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
      <Modal open={deleteModalOpen}>
        <ModalContent>
          <p>Você deseja deletar esse report ?</p>
          <div>
            <button style={{color: '#ff5f5f'}} onClick={handleDeleteReport}>
              Deletar
            </button>
            <button onClick={() => setDeleteModalOpen(false)}>Cancelar</button>
          </div>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Map;
