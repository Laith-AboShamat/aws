import React from 'react';
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CButton, CAlert } from '@coreui/react';
import DotLoader from 'react-spinners/DotLoader';

const NurseTableComponent = ({ users, handleEditClick, handleDeleteClick, isLoading }) => {
  const cellStyle = { textAlign: 'center', verticalAlign: 'middle' };

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
        <DotLoader color="#36D7B7" />
      </div>
    );
  }

  if (users.length === 0) {
    return <CAlert color="info" dismissible>No users available.</CAlert>;
  }

  return (
    <CTable striped responsive="sm" className="small-table">
      <CTableHead>
        <CTableRow>
          {['Given Name', 'Family Name', 'Phone', 'Email', 'Status', 'Date Created', 'Date Last Modified', 'Gender', 'Birthday', 'Actions'].map((header) => (
            <CTableHeaderCell scope="col" style={cellStyle} key={header}>{header}</CTableHeaderCell>
          ))}
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {users.map((user) => (
          <CTableRow key={user.id}>
            <CTableDataCell style={cellStyle}>{user.givenName}</CTableDataCell>
            <CTableDataCell style={cellStyle}>{user.familyName}</CTableDataCell>
            <CTableDataCell style={cellStyle}>{user.phone}</CTableDataCell>
            <CTableDataCell style={cellStyle}>{user.email}</CTableDataCell>
            <CTableDataCell style={cellStyle}>{user.status}</CTableDataCell>
            <CTableDataCell style={cellStyle}>{user.dateCreated}</CTableDataCell>
            <CTableDataCell style={cellStyle}>{user.dateLastModified}</CTableDataCell>
            <CTableDataCell style={cellStyle}>{user.gender}</CTableDataCell>
            <CTableDataCell style={cellStyle}>{user.birthday}</CTableDataCell>
            <CTableDataCell style={{ ...cellStyle, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <CButton color="warning" onClick={() => handleEditClick(user)}>Edit</CButton>
              <CButton color="danger" onClick={() => handleDeleteClick(user.id)}>Delete</CButton>
            </CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  );
};

export default NurseTableComponent;
