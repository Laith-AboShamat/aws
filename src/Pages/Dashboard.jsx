import { useEffect, useState } from 'react';
import React from 'react';
import { Pie, Bar, Line } from 'react-chartjs-2';
import { CCard, CCardBody, CCardHeader } from '@coreui/react';
import fetchData from '../utils/fetchData';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement
);

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [activeCount, setActiveCount] = useState(0);
  const [inactiveCount, setInactiveCount] = useState(0);
  const [chartData, setChartData] = useState({
    labels: ['Male', 'Female'],
    datasets: [
      {
        label: 'Gender Distribution',
        data: [],
        backgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  });

  const [ageData, setAgeData] = useState({
    labels: ['20-29', '30-39', '40-49', '50-59', '60+'],
    datasets: [
      {
        label: 'Age Distribution',
        data: [],
        backgroundColor: '#42A5F5',
      },
    ],
  });


  const [monthlyData, setMonthlyData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Nurses Added',
        data: [],
        borderColor: '#42A5F5',
        backgroundColor: 'rgba(66, 165, 245, 0.2)',
        fill: true,
      },
    ],
  });

  useEffect(() => {
    const loadData = async () => {
      const users = await fetchData();
      setUserCount(users.length);

      const activeUsers = users.filter(user => user.status === 'active').length;
      const inactiveUsers = users.filter(user => user.status === 'inactive').length;

      setActiveCount(activeUsers);
      setInactiveCount(inactiveUsers);

      const maleCount = users.filter(user => user.gender === 'male').length;
      const femaleCount = users.filter(user => user.gender === 'female').length;

      setChartData(prevState => ({
        ...prevState,
        datasets: [
          {
            ...prevState.datasets[0],
            data: [maleCount, femaleCount],
          },
        ],
      }));

      const currentYear = new Date().getFullYear();
      const ageCounts = [0, 0, 0, 0, 0];

      users.forEach(user => {
        if (user.birthday) {
          const birthYear = new Date(user.birthday).getFullYear();
          const age = currentYear - birthYear;

          if (age >= 20 && age < 30) ageCounts[0]++;
          else if (age >= 30 && age < 40) ageCounts[1]++;
          else if (age >= 40 && age < 50) ageCounts[2]++;
          else if (age >= 50 && age < 60) ageCounts[3]++;
          else if (age >= 60) ageCounts[4]++;
        }
      });

      setAgeData(prevState => ({
        ...prevState,
        datasets: [
          {
            ...prevState.datasets[0],
            data: ageCounts,
          },
        ],
      }));

      const monthCounts = Array(12).fill(0);
      users.forEach(user => {
        const createdDate = new Date(user.dateCreated);
        if (createdDate) {
          const month = createdDate.getMonth();
          monthCounts[month]++;
        }
      });

      const monthLabels = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
      ];

      setMonthlyData({
        labels: monthLabels,
        datasets: [{
          label: 'Nurses Added',
          data: monthCounts,
          borderColor: '#42A5F5',
          backgroundColor: 'rgba(66, 165, 245, 0.2)',
          fill: true,
        }],
      });
    };

    loadData();
  }, []);

  return (
    <div className="nursing-scheduler">
      <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Dashboard</h2>
      <div className="dashboard" style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        
        <CCard className="rounded-card" style={{ flex: 1 }}>
          <CCardHeader style={{ textAlign: 'center' }}>Total Users</CCardHeader>
          <CCardBody>
            <p style={{ fontSize: '24px', textAlign: 'center', fontWeight: 'bold' }}>{userCount}</p>
          </CCardBody>
        </CCard>

        <CCard className="rounded-card" style={{ flex: 1 }}>
          <CCardHeader style={{ textAlign: 'center' }}>Active Nurses</CCardHeader>
          <CCardBody>
            <p style={{ fontSize: '24px', textAlign: 'center', fontWeight: 'bold' }}>{activeCount}</p>
          </CCardBody>
        </CCard>

        <CCard className="rounded-card" style={{ flex: 1 }}>
          <CCardHeader style={{ textAlign: 'center' }}>Inactive Nurses</CCardHeader>
          <CCardBody>
            <p style={{ fontSize: '24px', textAlign: 'center', fontWeight: 'bold' }}>{inactiveCount}</p>
          </CCardBody>
        </CCard>
      </div>
      <div className="app" style={{ marginTop: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
        <div className="mixed-chart" style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px', width: '400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Pie data={chartData} width={150} height={150} />
        </div>

        <div className="mixed-chart" style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px', width: '400px' }}>
          <Bar data={ageData} width={150} height={150} options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Age Distribution',
              },
            },
          }} />
        </div>

        <div className="mixed-chart" style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px', width: '400px' }}>
          <Line data={monthlyData} width={150} height={150} options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Monthly Nurse Additions',
              },
            },
          }} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
