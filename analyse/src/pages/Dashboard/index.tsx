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
  Legend,
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
    createdAt: string;
  }[];
}
interface IChartData {}
const Dashboard: React.FC = () => {
  const [chartData, setChartData] = useState();
  useEffect(() => {
    async function getDataFromAPI() {
      const response = await api.get('/analyse/dashboard');
      console.log(response.data);
    }
    getDataFromAPI();
  }, []);
  return (
    <Container>
      <section id="top">
        <div>
          <h3>Casos por dia</h3>
          <LineChart>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis dataKey="cases" type="number" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="cases"
              stroke="#F44242"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="mortes"
              stroke="#f5da42"
              strokeWidth={2}
            />
          </LineChart>
        </div>
      </section>
    </Container>
  );
};

export default Dashboard;
