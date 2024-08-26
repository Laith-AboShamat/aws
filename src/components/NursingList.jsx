import { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardHeader } from '@coreui/react';
import AlertComponent from './AlertComponent';
import NurseFormComponent from './NurseFormComponent';
import SearchComponent from './SearchComponent';
import NurseTableComponent from './NurseTableComponent';

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

        const mappedData = data.map(user => ({
          id: user.id,
          givenName: user.GivenName,
          familyName: user.FamilyName,
          phone: user.Phone,
          email: user.Email,
          status: user.Status,
          createdBy: user.CreatedBy,
          dateCreated: user.DateCreated,
          lastModifiedBy: user.LastModifiedBy,
          dateLastModified: user.DateLastModified,
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

  const handleCancelEdit = () => {
    setEditingUser(null);
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
          <AlertComponent alert={alert} setAlert={setAlert} />

          <NurseFormComponent
            user={editingUser || newUser}
            setUser={editingUser ? setEditingUser : setNewUser}
            handleSubmit={editingUser ? handleUpdateUser : handleAddUser}
            isEditing={!!editingUser}
            handleCancel={handleCancelEdit}
          />

          <SearchComponent search={search} setSearch={setSearch} />

          <NurseTableComponent users={filteredUsers} handleEditClick={handleEditClick} />
        </CCardBody>
      </CCard>
    </div>
  );
};

export default NursingList;
