import React from 'react';
import { CSidebar, CSidebarHeader, CSidebarBrand, CSidebarNav, CNavTitle, CNavItem, CNavGroup, CBadge, CButton } from '@coreui/react';
import { CIcon } from '@coreui/icons-react';
import { cilPuzzle, cilContact, cilCalendar, cilSettings, cilHome, cilAccountLogout } from '@coreui/icons';
import nurseImage from '../../assets/nurse.jpg';

const Sidebar = ({ setActiveSection }) => {
  const handleLogout = () => {
    console.log('Logout button clicked');
  };

  return (
    <CSidebar className="border-end sidebar-full-height" unfoldable>
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand>
          <img src={nurseImage} alt="Nurse" style={{ height: '40px', width: 'auto' }} />
        </CSidebarBrand>
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

        {/* Logout Button */}
        <CNavItem className="mt-auto">
          <CButton color="red" className="w-60" onClick={handleLogout}>
            <CIcon customClassName="nav-icon" icon={cilAccountLogout} />
          </CButton>
        </CNavItem>
      </CSidebarNav>
    </CSidebar>
  );
}

export default Sidebar;
