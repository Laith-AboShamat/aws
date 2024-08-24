import React from 'react'
import { CSidebar, CSidebarHeader, CSidebarBrand, CSidebarNav, CNavTitle, CNavItem, CNavGroup, CBadge } from '@coreui/react'
import { CIcon } from '@coreui/icons-react'
import { cilPuzzle, cilContact, cilCalendar, cilSettings, cilStar, cilHome } from '@coreui/icons'

const Sidebar = ({ setActiveSection }) => {
  return (
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

        <CNavItem href="#" onClick={() => setActiveSection('home')}>
          <CIcon customClassName="nav-icon" icon={cilHome} />
          Home
        </CNavItem>

        <CNavItem href="#" onClick={() => setActiveSection('settings')}>
          <CIcon customClassName="nav-icon" icon={cilSettings} />
          Settings
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
  )
}

export default Sidebar
