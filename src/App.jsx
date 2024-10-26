import { useState } from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';
import '@aws-amplify/ui-react/styles.css';
import './App.css';
import '@coreui/coreui/dist/css/coreui.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Sidebar from './Layout/SideBar';
import NursingList from './Pages/NursingList';
import Scheduler from './Pages/Scheduler';
import Header from './Layout/Header';
import Home from './Pages/Dashboard';
import Dashboard from './Pages/Dashboard';

Amplify.configure(awsconfig);

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div className="app-container">
          <Sidebar setActiveSection={setActiveSection} signOut={signOut} />

          <div className="main-content">
            <Header />
            {activeSection === 'dashboard' && <Dashboard />}
            {activeSection === 'nursingList' && <NursingList />}
            {activeSection === 'scheduler' && <Scheduler />}
          </div>
        </div>
      )}
    </Authenticator>
  );
}

export default App;
