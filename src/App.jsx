import { useState } from 'react'
import './App.css'
import '@coreui/coreui/dist/css/coreui.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import Sidebar from './components/Layout/SideBar'
import NursingList from './components/NursingTable/NursingList'
import Scheduler from './components/Layout/Scheduler'
import Header from './components/Layout/Header'

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
