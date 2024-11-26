import React, { useState } from 'react';
import {
  CSidebar,
  CSidebarHeader,
  CSidebarBrand,
  CSidebarNav,
  CNavTitle,
  CNavItem,
  CNavGroup,
  CBadge,
  CButton,
} from '@coreui/react';

import { CIcon } from '@coreui/icons-react';

import { cilPuzzle, cilContact, cilCalendar, cilSettings, cilHome, cilAccountLogout, cilMenu } from '@coreui/icons';
import nurseImage from '../assets/nurse.jpg';

const Sidebar = ({ setActiveSection, signOut, isArabic }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <>
      <div className="block md:hidden fixed top-4 left-4 z-50">
        <CButton onClick={toggleSidebar} className="bg-blue-500 text-white p-2 rounded">
          <CIcon icon={cilMenu} />
        </CButton>
      </div>

      <CSidebar
        visible={isSidebarVisible || window.innerWidth >= 768}
        onVisibleChange={(visible) => setIsSidebarVisible(visible)}
        className={`border border-${isArabic ? 'blue-500' : 'gray-300'} sidebar-full-height`}
        style={{ transition: 'all 0.3s ease-in-out' }}
        {...(isArabic && { dir: 'rtl' })}
      >
        <CSidebarHeader className="border-bottom">
          <CSidebarBrand>
            <img src={nurseImage} alt="Nurse" style={{ height: '40px', width: 'auto' }} />
          </CSidebarBrand>
        </CSidebarHeader>

        <CSidebarNav>
          <CNavTitle>{isArabic ? 'جدول التمريض' : 'Nursing Scheduler'}</CNavTitle>

          <CNavItem href="#" onClick={() => setActiveSection('dashboard')}>
            <CIcon customClassName="nav-icon" icon={cilHome} />
            {isArabic ? 'لوحة التحكم' : 'Dashboard'}
          </CNavItem>

          <CNavItem href="#" onClick={() => setActiveSection('nursingList')}>
            <CIcon customClassName="nav-icon" icon={cilContact} />
            {isArabic ? 'قائمة التمريض' : 'Nursing List'}
            <CBadge color="primary ms-auto">{isArabic ? 'جديد' : 'NEW'}</CBadge>
          </CNavItem>

          <CNavItem href="#" onClick={() => setActiveSection('scheduler')}>
            <CIcon customClassName="nav-icon" icon={cilCalendar} />
            {isArabic ? 'الجدول' : 'Scheduler'}
            <CBadge color="primary ms-auto">{isArabic ? 'جديد' : 'NEW'}</CBadge>
          </CNavItem>

          <CNavItem href="#" onClick={() => setActiveSection('settings')}>
            <CIcon customClassName="nav-icon" icon={cilSettings} />
            {isArabic ? 'الإعدادات' : 'Settings'}
          </CNavItem>

          <CNavGroup
            toggler={
              <>
                <CIcon customClassName="nav-icon" icon={cilPuzzle} />
                {isArabic ? 'اختبار القائمة' : 'Nav Dropdown Test'}
              </>
            }
          >
            <CNavItem href="#">
              <span className="nav-icon">
                <span className="nav-icon-bullet"></span>
              </span>
              {isArabic ? 'عنصر القائمة ١' : 'Nav Dropdown Item 1'}
            </CNavItem>
            <CNavItem href="#">
              <span className="nav-icon">
                <span className="nav-icon-bullet"></span>
              </span>
              {isArabic ? 'عنصر القائمة ٢' : 'Nav Dropdown Item 2'}
            </CNavItem>
          </CNavGroup>

          <CNavItem className="mt-auto">
            <CButton title={isArabic ? 'تسجيل الخروج' : 'Signout'} onClick={signOut} className="w-full">
              <CIcon customClassName="nav-icon" icon={cilAccountLogout} />
              {isArabic ? 'تسجيل الخروج' : 'SignOut'}
            </CButton>
          </CNavItem>
        </CSidebarNav>
      </CSidebar>
    </>
  );
};

export default Sidebar;
