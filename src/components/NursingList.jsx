import { useState, useEffect } from 'react';
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CCard, CCardBody, CCardHeader } from '@coreui/react';

const NursingList = () => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch data from an API or other source here
    // Example:
    fetch('https://api.example.com/users')
      .then(response => response.json())
      .then(data => setUsers(data));
  }, []);

  const filteredUsers = users.filter(user =>
    Object.values(user).some(value =>
      value.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className='nursing-list-wrapper'>
      <CCard className='rounded-card'>
        <CCardHeader>
          <h2 className='pad'>Nursing List</h2>
        </CCardHeader>
        <CCardBody>
          <div className='search-wrapper'>
            <input
              type='text'
              placeholder='Search...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='form-control'
            />
          </div>
          <CTable striped responsive="sm" className="small-table">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">Date Created</CTableHeaderCell>
                <CTableHeaderCell scope="col">Date Last Modified</CTableHeaderCell>
                <CTableHeaderCell scope="col">Created By</CTableHeaderCell>
                <CTableHeaderCell scope="col">Last Modified By</CTableHeaderCell>
                <CTableHeaderCell scope="col">Given Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Family Name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
                <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                <CTableHeaderCell scope="col">Status</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {filteredUsers.map((user, index) => (
                <CTableRow key={index}>
                  <CTableDataCell>{user.dateCreated}</CTableDataCell>
                  <CTableDataCell>{user.dateLastModified}</CTableDataCell>
                  <CTableDataCell>{user.createdBy}</CTableDataCell>
                  <CTableDataCell>{user.lastModifiedBy}</CTableDataCell>
                  <CTableDataCell>{user.givenName}</CTableDataCell>
                  <CTableDataCell>{user.familyName}</CTableDataCell>
                  <CTableDataCell>{user.phone}</CTableDataCell>
                  <CTableDataCell>{user.email}</CTableDataCell>
                  <CTableDataCell>{user.status}</CTableDataCell>
                </CTableRow>
              ))}
              <CTableRow active>
                <CTableDataCell>2024-08-20</CTableDataCell>
                <CTableDataCell>2024-08-21</CTableDataCell>
                <CTableDataCell>John Doe</CTableDataCell>
                <CTableDataCell>Jane Smith</CTableDataCell>
                <CTableDataCell>Mark</CTableDataCell>
                <CTableDataCell>Otto</CTableDataCell>
                <CTableDataCell>+1 (123) 456-7890</CTableDataCell>
                <CTableDataCell>mark@example.com</CTableDataCell>
                <CTableDataCell>Active</CTableDataCell>
              </CTableRow>
              <CTableRow>
                <CTableDataCell>2024-08-19</CTableDataCell>
                <CTableDataCell>2024-08-20</CTableDataCell>
                <CTableDataCell>Jacob Smith</CTableDataCell>
                <CTableDataCell>Jane Doe</CTableDataCell>
                <CTableDataCell>Jacob</CTableDataCell>
                <CTableDataCell>Thornton</CTableDataCell>
                <CTableDataCell>+1 (987) 654-3210</CTableDataCell>
                <CTableDataCell>jacob@example.com</CTableDataCell>
                <CTableDataCell>Inactive</CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </div>
  );
}

export default NursingList;
