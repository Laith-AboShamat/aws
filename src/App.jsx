import { useState } from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';
import '@aws-amplify/ui-react/styles.css';
import './App.css';
import '@coreui/coreui/dist/css/coreui.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Sidebar from './components/Layout/SideBar';
import NursingList from './components/Pages/NursingList';
import Scheduler from './components/Pages/Scheduler';
import Header from './components/Layout/Header';
import AddNurse from './components/Pages/AddNurse';

Amplify.configure(awsconfig);

function App() {
  const [activeSection, setActiveSection] = useState('');

  return (
    <Authenticator>
      {({ signOut, user }) => (
        <div className="app-container">
          <Sidebar setActiveSection={setActiveSection} signOut={signOut} />

          <div className="main-content">
            <Header />

            {activeSection === 'nursingList' && <NursingList />}
            {activeSection === 'scheduler' && <Scheduler />}
            {activeSection === 'addNurse' && <AddNurse />}
          </div>
        </div>
      )}
    </Authenticator>
  );
}

export default App;
