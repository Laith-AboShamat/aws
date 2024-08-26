import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CButton, CAlert } from '@coreui/react';

const NurseTableComponent = ({ users, handleEditClick }) => {
  return (
    <div>
      {users.length === 0 ? (
        <CAlert color='info' dismissible>
          No users available.
        </CAlert>
      ) : (
        <CTable striped responsive="sm" className="small-table">
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">Given Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">Family Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
              <CTableHeaderCell scope="col">Email</CTableHeaderCell>
              <CTableHeaderCell scope="col">Status</CTableHeaderCell>
              <CTableHeaderCell scope="col">Created By</CTableHeaderCell>
              <CTableHeaderCell scope="col">Date Created</CTableHeaderCell>
              <CTableHeaderCell scope="col">Last Modified By</CTableHeaderCell>
              <CTableHeaderCell scope="col">Date Last Modified</CTableHeaderCell>
              <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {users.map((user) => (
              <CTableRow key={user.email}>
                <CTableDataCell>{user.givenName}</CTableDataCell>
                <CTableDataCell>{user.familyName}</CTableDataCell>
                <CTableDataCell>{user.phone}</CTableDataCell>
                <CTableDataCell>{user.email}</CTableDataCell>
                <CTableDataCell>{user.status}</CTableDataCell>
                <CTableDataCell>{user.createdBy}</CTableDataCell>
                <CTableDataCell>{user.dateCreated}</CTableDataCell>
                <CTableDataCell>{user.lastModifiedBy}</CTableDataCell>
                <CTableDataCell>{user.dateLastModified}</CTableDataCell>
                <CTableDataCell>
                  <CButton color='warning' onClick={() => handleEditClick(user)}>Edit</CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      )}
    </div>
  );
};

export default NurseTableComponent;
