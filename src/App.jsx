import { useState } from 'react'
import './App.css'
import '@coreui/coreui/dist/css/coreui.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import Sidebar from './components/SideBar'
import NursingList from './components/NursingList'
import Scheduler from './components/Scheduler'
import Header from './components/Header'

function App() {
  const [activeSection, setActiveSection] = useState('')

  return (
    <>
      <Sidebar setActiveSection={setActiveSection} />

      <div className="content">
        <Header />

        {activeSection === 'nursingList' && <NursingList />}
        {activeSection === 'scheduler' && <Scheduler />}
      </div>
    </>
  )
}

export default App
