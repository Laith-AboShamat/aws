import { useState, useEffect } from 'react';
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CCard, CCardBody, CCardHeader, CButton, CForm, CFormInput, CRow, CCol } from '@coreui/react';

const NursingList = () => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    dateCreated: '',
    dateLastModified: '',
    createdBy: '',
    lastModifiedBy: '',
    givenName: '',
    familyName: '',
    phone: '',
    email: '',
    status: '',
  });

  // Load users from localStorage on component mount
  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  // Save users to localStorage whenever they are updated
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    const newUserWithDates = {
      ...newUser,
      dateCreated: new Date().toISOString().split('T')[0], // Current date
      dateLastModified: new Date().toISOString().split('T')[0], // Current date
    };
    setUsers([...users, newUserWithDates]);
    setNewUser({
      dateCreated: '',
      dateLastModified: '',
      createdBy: '',
      lastModifiedBy: '',
      givenName: '',
      familyName: '',
      phone: '',
      email: '',
      status: '',
    });
  };

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
          {/* Add User Form */}
          <CForm onSubmit={handleAddUser}>
            <CRow>
              <CCol md="2">
                <CFormInput
                  type='text'
                  name='givenName'
                  placeholder='Given Name'
                  value={newUser.givenName}
                  onChange={handleInputChange}
                  required
                />
              </CCol>
              <CCol md="2">
                <CFormInput
                  type='text'
                  name='familyName'
                  placeholder='Family Name'
                  value={newUser.familyName}
                  onChange={handleInputChange}
                  required
                />
              </CCol>
              <CCol md="2">
                <CFormInput
                  type='text'
                  name='phone'
                  placeholder='Phone'
                  value={newUser.phone}
                  onChange={handleInputChange}
                  required
                />
              </CCol>
              <CCol md="2">
                <CFormInput
                  type='email'
                  name='email'
                  placeholder='Email'
                  value={newUser.email}
                  onChange={handleInputChange}
                  required
                />
              </CCol>
              <CCol md="2">
                <CFormInput
                  type='text'
                  name='status'
                  placeholder='Status'
                  value={newUser.status}
                  onChange={handleInputChange}
                  required
                />
              </CCol>
              <CCol md="2">
                <CButton type='submit' color='primary'>Add User</CButton>
              </CCol>
            </CRow>
          </CForm>

          {/* Search */}
          <div className='search-wrapper'>
            <input
              type='text'
              placeholder='Search...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='form-control'
            />
          </div>

          {/* User Table */}
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
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {filteredUsers.map((user, index) => (
                <CTableRow key={index}>
                  <CTableDataCell>{user.givenName}</CTableDataCell>
                  <CTableDataCell>{user.familyName}</CTableDataCell>
                  <CTableDataCell>{user.phone}</CTableDataCell>
                  <CTableDataCell>{user.email}</CTableDataCell>
                  <CTableDataCell>{user.status}</CTableDataCell>
                  <CTableDataCell>{user.createdBy}</CTableDataCell>
                  <CTableDataCell>{user.dateCreated}</CTableDataCell>
                  <CTableDataCell>{user.lastModifiedBy}</CTableDataCell>
                  <CTableDataCell>{user.dateLastModified}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </div>
  );
}

export default NursingList;
