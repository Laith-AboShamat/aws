import React, { useEffect, useState } from 'react';
import { CCard, CCardBody, CCardHeader } from '@coreui/react';
import fetchData from '../utils/fetchData';

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [activeCount, setActiveCount] = useState(0);
  const [inactiveCount, setInactiveCount] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      const users = await fetchData();
      setUserCount(users.length);

      const activeUsers = users.filter(user => user.status === 'active').length;
      const inactiveUsers = users.filter(user => user.status === 'inactive').length;

      setActiveCount(activeUsers);
      setInactiveCount(inactiveUsers);
    };

    loadData();
  }, []);

  return (
    <div className="nursing-scheduler">
      <h2>Dashboard</h2>
      <div className="dashboard" style={{ display: 'flex', gap: '20px', marginTop: 'px' }}>
        
        <CCard className="rounded-card" style={{ flex: 1 }}>
          <CCardHeader style={{textAlign: 'center'}}>Total Users</CCardHeader>
          <CCardBody>
            <p style={{ fontSize: '24px', textAlign: 'center', fontWeight: 'bold' }}>{userCount}</p>
          </CCardBody>
        </CCard>

        <CCard className="rounded-card" style={{ flex: 1 }}>
          <CCardHeader style={{textAlign: 'center'}}>Active Nurses</CCardHeader>
          <CCardBody>
            <p style={{ fontSize: '24px', textAlign: 'center', fontWeight: 'bold' }}>{activeCount}</p>
          </CCardBody>
        </CCard>

        <CCard className="rounded-card" style={{ flex: 1 }}>
          <CCardHeader style={{textAlign: 'center'}} >InActive Nurses</CCardHeader>
          <CCardBody>
            <p style={{ fontSize: '24px', textAlign: 'center', fontWeight: 'bold' }}>{inactiveCount}</p>
          </CCardBody>
        </CCard>
      </div>
    </div>
  );
};

export default Dashboard;
