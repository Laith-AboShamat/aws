import { useState, useEffect } from 'react';
import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell, CCard, CCardBody, CCardHeader, CButton, CForm, CFormInput, CRow, CCol, CAlert, CFormSelect } from '@coreui/react';

const NursingList = () => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  const [alert, setAlert] = useState({ visible: false, message: '', color: '' });
  const [newUser, setNewUser] = useState({
    givenName: '',
    familyName: '',
    phone: '',
    email: '',
    status: '',
  });
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://b6yxpbgn7k.execute-api.eu-north-1.amazonaws.com/GetNurseData');
        const data = await response.json();
        
        // Map API response to match field names expected in the UI
        const mappedData = data.map(user => ({
          id: user.id, // Ensure 'id' is unique and not modified
          givenName: user.GivenName,
          familyName: user.FamilyName,
          phone: user.Phone,
          email: user.Email,
          status: user.Status,
          createdBy: user.CreatedBy,
          dateCreated: user.DateCreated,
          lastModifiedBy: user.LastModifiedBy,
          dateLastModified: user.DateLastModified
        }));
        
        setUsers(mappedData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setAlert({ visible: true, message: 'Error fetching data from server.', color: 'danger' });
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleAddUser = async (e) => {
    e.preventDefault();

    if (!newUser.givenName || !newUser.familyName || !newUser.phone || !newUser.email || !newUser.status) {
      setAlert({ visible: true, message: 'Please fill in all fields.', color: 'danger' });
      return;
    }

    const newUserWithDates = {
      ...newUser,
      dateCreated: new Date().toISOString().split('T')[0],
      dateLastModified: new Date().toISOString().split('T')[0],
      createdBy: null,
      lastModifiedBy: null,
    };

    try {
      const response = await fetch('https://iswtf9imy1.execute-api.eu-north-1.amazonaws.com/CreateNurseData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUserWithDates),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setUsers([...users, data]);

      setNewUser({
        givenName: '',
        familyName: '',
        phone: '',
        email: '',
        status: '',
      });

      setAlert({ visible: true, message: 'User added successfully!', color: 'success' });
    } catch (error) {
      console.error('Error adding user:', error);
      setAlert({ visible: true, message: 'Error adding user to server.', color: 'danger' });
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();

    if (!editingUser.givenName || !editingUser.familyName || !editingUser.phone || !editingUser.email || !editingUser.status) {
      setAlert({ visible: true, message: 'Please fill in all fields.', color: 'danger' });
      return;
    }

    const updatedUser = {
      ...editingUser,
      dateLastModified: new Date().toISOString().split('T')[0],
      lastModifiedBy: 'unknown',
    };

    try {
      const response = await fetch('https://djnh3nx6uf.execute-api.eu-north-1.amazonaws.com/UpdateNurseData', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setUsers(users.map(user => (user.email === data.email ? data : user)));
      setEditingUser(null);

      setAlert({ visible: true, message: 'User updated successfully!', color: 'success' });
    } catch (error) {
      console.error('Error updating user:', error);
      setAlert({ visible: true, message: 'Error updating user on server.', color: 'danger' });
    }
  };

  const handleEditClick = (user) => {
    setEditingUser({ ...user });
  };

  const filteredUsers = users.filter(user =>
    Object.values(user).some(value =>
      (value ? value.toString().toLowerCase() : '').includes(search.toLowerCase())
    )
  );

  return (
    <div className='nursing-list-wrapper'>
      <CCard className='rounded-card'>
        <CCardHeader>
          <h2 className='pad'>Nursing List</h2>
        </CCardHeader>
        <CCardBody>

          {alert.visible && (
            <CAlert color={alert.color} dismissible onClose={() => setAlert({ visible: false })}>
              {alert.message}
            </CAlert>
          )}

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
                <CFormSelect
                  name="status"
                  value={newUser.status}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </CFormSelect>
              </CCol>
              <CCol md="2">
                <CButton type='submit' color='primary'>Add User</CButton>
              </CCol>
            </CRow>
          </CForm>

          <div className='search-wrapper'>
            <input
              type='text'
              placeholder='Search...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='form-control'
            />
          </div>

          {editingUser && (
            <CForm onSubmit={handleUpdateUser} className="update-form">
              <CRow>
                <CCol md="2">
                  <CFormInput
                    type='text'
                    name='givenName'
                    placeholder='Given Name'
                    value={editingUser.givenName}
                    onChange={(e) => setEditingUser({ ...editingUser, givenName: e.target.value })}
                    required
                  />
                </CCol>
                <CCol md="2">
                  <CFormInput
                    type='text'
                    name='familyName'
                    placeholder='Family Name'
                    value={editingUser.familyName}
                    onChange={(e) => setEditingUser({ ...editingUser, familyName: e.target.value })}
                    required
                  />
                </CCol>
                <CCol md="2">
                  <CFormInput
                    type='text'
                    name='phone'
                    placeholder='Phone'
                    value={editingUser.phone}
                    onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                    required
                  />
                </CCol>
                <CCol md="2">
                  <CFormInput
                    type='email'
                    name='email'
                    placeholder='Email'
                    value={editingUser.email}
                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                    required
                  />
                </CCol>
                <CCol md="2">
                  <CFormSelect
                    name="status"
                    value={editingUser.status}
                    onChange={(e) => setEditingUser({ ...editingUser, status: e.target.value })}
                    required
                  >
                    <option value="">Select Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </CFormSelect>
                </CCol>
                <CCol md="2">
                  <CButton type='submit' color='success'>Update User</CButton>
                  <CButton color='secondary' onClick={() => setEditingUser(null)}>Cancel</CButton>
                </CCol>
              </CRow>
            </CForm>
          )}

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
              {filteredUsers.map((user) => (
                <CTableRow key={user.email}> {/* Use email as the key */}
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
        </CCardBody>
      </CCard>
    </div>
  );
}

export default NursingList;
