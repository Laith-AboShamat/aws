import React, { useState } from 'react'
import { CHeader, CHeaderNav, CNavItem, CNavLink, CAvatar, CBadge } from '@coreui/react'
import { CIcon } from '@coreui/icons-react'
import { cilBell } from '@coreui/icons'
import avatar from '../assets/avatar.png'

const Header = () => {
  const [isArabic, setIsArabic] = useState(false);

  // Function to toggle language and apply RTL
  const toggleLanguage = () => {
    setIsArabic(!isArabic);

    // Update the document's direction attribute
    if (!isArabic) {
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
    }
  };

  return (
    <CHeader position="sticky">
      <CHeaderNav className="d-md-down-none me-auto align-items-center">
        <CNavItem>
          <CNavLink href="#">{isArabic ? 'الإعدادات' : 'Settings'}</CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="#">{isArabic ? 'المستخدمين' : 'Users'}</CNavLink>
        </CNavItem>
      </CHeaderNav>

      <CHeaderNav className="ms-3 align-items-center">
        <CNavItem className="d-flex align-items-center">
          <CNavLink href="#">
            <CIcon icon={cilBell} size="lg" />
            <CBadge color="danger" shape="rounded-pill" className="ms-2">2</CBadge>
          </CNavLink>
        </CNavItem>

        <CNavItem className="d-flex align-items-center">
          <CNavLink href="#">
            <CAvatar src={avatar} size="md" />
          </CNavLink>
        </CNavItem>

        {/* Arabic Translate Button */}
        <CNavItem className="d-flex align-items-center">
          <button
            className="btn btn-primary ms-3"
            onClick={toggleLanguage}
          >
            {isArabic ? 'English' : 'العربية'}
          </button>
        </CNavItem>
      </CHeaderNav>
    </CHeader>
  )
}

export default Header
