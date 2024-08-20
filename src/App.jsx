// App.js
import { useState } from 'react'
import './App.css'
import '@coreui/coreui/dist/css/coreui.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import {
  CSidebar,
  CSidebarHeader,
  CSidebarBrand,
  CSidebarNav,
  CNavTitle,
  CNavItem,
  CNavGroup,
  CBadge
} from '@coreui/react'

import { CIcon } from '@coreui/icons-react'
import { cilPuzzle, cilContact, cilCalendar } from '@coreui/icons'

import NursingList from './components/NursingList'
import Scheduler from './components/Scheduler'

function App() {
  const [activeSection, setActiveSection] = useState('') 

  return (
    <>
      <CSidebar className="border-end" unfoldable>
        <CSidebarHeader className="border-bottom">
          <CSidebarBrand>NS</CSidebarBrand>
        </CSidebarHeader>
        <CSidebarNav>
          <CNavTitle>Nursing Scheduler</CNavTitle>
          
          <CNavItem href="#" onClick={() => setActiveSection('nursingList')}>
            <CIcon customClassName="nav-icon" icon={cilContact} /> 
            Nursing List
            <CBadge color="primary ms-auto">NEW</CBadge>
          </CNavItem>
          
          <CNavItem href="#" onClick={() => setActiveSection('scheduler')}>
            <CIcon customClassName="nav-icon" icon={cilCalendar} /> 
            Scheduler 
            <CBadge color="primary ms-auto">NEW</CBadge>
          </CNavItem>
          
          <CNavGroup
            toggler={
              <>
                <CIcon customClassName="nav-icon" icon={cilPuzzle} /> 
                Nav dropdown Test
              </>
            }
          >
            <CNavItem href="#"><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Nav dropdown item1</CNavItem>
            <CNavItem href="#"><span className="nav-icon"><span className="nav-icon-bullet"></span></span> Nav dropdown item2</CNavItem>
          </CNavGroup>
        </CSidebarNav>
      </CSidebar>

      <div className="content">
        {activeSection === 'nursingList' && <NursingList />}
        {activeSection === 'scheduler' && <Scheduler />}
      </div>
    </>
  )
}

export default App
