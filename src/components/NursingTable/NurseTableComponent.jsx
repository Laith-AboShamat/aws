import React from 'react';
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CButton, CAlert } from '@coreui/react';
import DotLoader from 'react-spinners/DotLoader';

const NurseTableComponent = ({ users, handleEditClick, handleDeleteClick, isLoading }) => {
  const cellStyle = { textAlign: 'center', verticalAlign: 'middle' };

  return (
    <div>
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
          <DotLoader color="#36D7B7" />
        </div>
      ) : (
        <>
          {users.length === 0 ? (
            <CAlert color="info" dismissible>
              No users available.
            </CAlert>
          ) : (
            <CTable striped responsive="sm" className="small-table">
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col" style={cellStyle}>Given Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={cellStyle}>Family Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={cellStyle}>Phone</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={cellStyle}>Email</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={cellStyle}>Status</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={cellStyle}>Created By</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={cellStyle}>Date Created</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={cellStyle}>Last Modified By</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={cellStyle}>Date Last Modified</CTableHeaderCell>
                  <CTableHeaderCell scope="col" style={cellStyle}>Actions</CTableHeaderCell>
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
                    <CTableDataCell style={cellStyle}>{user.createdBy}</CTableDataCell>
                    <CTableDataCell style={cellStyle}>{user.dateCreated}</CTableDataCell>
                    <CTableDataCell style={cellStyle}>{user.lastModifiedBy}</CTableDataCell>
                    <CTableDataCell style={cellStyle}>{user.dateLastModified}</CTableDataCell>
                    <CTableDataCell style={{ ...cellStyle, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <CButton color="warning" onClick={() => handleEditClick(user)}>
                        Edit
                      </CButton>
                      <CButton color="danger" onClick={() => handleDeleteClick(user.id)}>
                        Delete
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          )}
        </>
      )}
    </div>
  );
};

export default NurseTableComponent;
