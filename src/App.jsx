import { useState } from 'react'
import './App.css'
import '@coreui/coreui/dist/css/coreui.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import Sidebar from './components/SideBar'
import NursingList from './components/NursingList'
import Scheduler from './components/Scheduler'

function App() {
  const [activeSection, setActiveSection] = useState('')

  return (
    <>
      <Sidebar setActiveSection={setActiveSection} />

      <div className="content">
        {activeSection === 'nursingList' && <NursingList />}
        {activeSection === 'scheduler' && <Scheduler />}
        {/* Add additional sections here if needed */}
      </div>
    </>
  )
}

export default App
