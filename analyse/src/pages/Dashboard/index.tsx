import React, {useEffect, useState} from 'react';

import {Container} from './styles';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
} from 'recharts';
import api from '../../services/api';
interface IReport {
  id: number;
  category: {
    id: number;
    name: string;
  };
  createdAt: string;
  status: {
    description: string;
    created_at: string;
  }[];
}
interface IChartData {
  date: string;
  reports: number;
}
interface IPieData {
  name: string;
  reports: number;
}
interface IDashboard {
  reports_per_day: IChartData[];
  total_reports: number;
  reports_finished: number;
  total_categories: IPieData[];
}

const Dashboard: React.FC = () => {
  const [chartData, setChartData] = useState<IChartData[]>();
  const [pieData, setPieData] = useState<IPieData[]>();
  const [totalReports, setTotalReports] = useState<number>();
  const [finishedReports, setFinishedReports] = useState<number>();
  useEffect(() => {
    async function getDataFromAPI() {
      const response = await api.get<IDashboard>('/analyse/dashboard');
      setChartData(response.data.reports_per_day);
      setPieData(response.data.total_categories);
      setTotalReports(response.data.total_reports);
      setFinishedReports(response.data.reports_finished);
    }
    getDataFromAPI();
  }, []);

  return (
    <Container>
      <section id="top">
        <div>
          <h3>Reports por dia</h3>
          <ResponsiveContainer width={'100%'} height={200}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis dataKey="reports" type="number" />
              <Tooltip />
              <Line
                name="Reports"
                type="monotone"
                dataKey="reports"
                stroke="#ff5f5f"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>
      <section id="button">
        <div className="dashboard-item">
          <h3>Reports por categoria</h3>
          <ResponsiveContainer width={'100%'} height={180}>
            <PieChart>
              <Pie
                dataKey="reports"
                isAnimationActive
                data={pieData}
                outerRadius={70}
                fill="#ff5f5f"
                label
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="dashboard-item">
          <h3>Reports registrados</h3>
          <h6 style={{color: '#ff5f5f'}}>{totalReports}</h6>
          <h3>Reports concluídos</h3>
          <h6 style={{color: '#3DEC59'}}>{finishedReports}</h6>
        </div>
        <div className="dashboard-item"></div>
      </section>
    </Container>
  );
};

export default Dashboard;
