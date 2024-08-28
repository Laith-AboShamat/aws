import React from 'react'
import { CHeader, CHeaderNav, CNavItem, CNavLink, CAvatar, CBadge } from '@coreui/react'
import { CIcon } from '@coreui/icons-react'
import { cilBell } from '@coreui/icons'
import avatar from '../../assets/avatar.png'

const Header = () => {
  return (
    <CHeader position="sticky" className="" style={{ marginLeft: '80px' }}> {/* Adjust the left margin based on your sidebar width */}
      <CHeaderNav className="d-md-down-none me-auto align-items-center"> {/* Flex utility to center items */}
        <CNavItem>
          <CNavLink href="#">Settings</CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="#">Users</CNavLink>
        </CNavItem>
      </CHeaderNav>

      <CHeaderNav className="ms-3 align-items-center"> {/* Flex utility to center items */}
        {/* Notifications */}
        <CNavItem className="d-flex align-items-center">
          <CNavLink href="#">
            <CIcon icon={cilBell} size="lg" />
            <CBadge color="danger" shape="rounded-pill" className="ms-2">2</CBadge>
          </CNavLink>
        </CNavItem>

        {/* Avatar */}
        <CNavItem className="d-flex align-items-center">
          <CNavLink href="#">
            <CAvatar src={avatar} size="md" />
          </CNavLink>
        </CNavItem>
      </CHeaderNav>
    </CHeader>
  )
}

export default Header
