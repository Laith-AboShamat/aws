import { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardHeader } from '@coreui/react';
import AlertComponent from './AlertComponent';
import NurseFormComponent from './NurseFormComponent';
import SearchComponent from './SearchComponent';
import NurseTableComponent from './NurseTableComponent';
import DotLoader from 'react-spinners/DotLoader';

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
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
      } finally {
        setIsLoading(false);
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
  
    const formatDateTime = (date) => {
      return new Date(date).toLocaleString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
      });
    };
  
    const newUserWithDates = {
      ...newUser,
      dateCreated: formatDateTime(new Date()),
      dateLastModified: formatDateTime(new Date()),
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
  
      const newNurse = {
        id: data.id || 'new-id',
        givenName: data.givenName || newUser.givenName,
        familyName: data.familyName || newUser.familyName,
        phone: data.phone || newUser.phone,
        email: data.email || newUser.email,
        status: data.status || newUser.status,
        createdBy: data.createdBy || newUser.createdBy,
        dateCreated: formatDateTime(data.dateCreated || newUser.dateCreated),
        lastModifiedBy: data.lastModifiedBy || newUser.lastModifiedBy,
        dateLastModified: formatDateTime(data.dateLastModified || newUser.dateLastModified),
      };
  
      setUsers([...users, newNurse]);
  
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
      id: editingUser.id,
      givenName: editingUser.givenName,
      familyName: editingUser.familyName,
      phone: editingUser.phone,
      status: editingUser.status,
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
      setUsers(users.map(user => (user.id === data.id ? data : user)));
      setEditingUser(null);
  
      setAlert({ visible: true, message: 'User updated successfully!', color: 'success' });
    } catch (error) {
      console.error('Error updating user:', error);
      setAlert({ visible: true, message: 'Error updating user on server.', color: 'danger' });
    }
  };

  const handleDeleteUser = async (user) => {
    try {
      const response = await fetch('https://6di25phvk3.execute-api.eu-north-1.amazonaws.com/DeleteNurseData', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: user.id }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log('Delete response:', data);
  
      setUsers(users.filter(u => u.id !== user.id));
      setAlert({ visible: true, message: 'User deleted successfully!', color: 'success' });
    } catch (error) {
      console.error('Error deleting user:', error);
      setAlert({ visible: true, message: 'Error deleting user from server.', color: 'danger' });
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

          <NurseTableComponent 
            users={filteredUsers} 
            handleEditClick={handleEditClick} 
            handleDeleteClick={handleDeleteUser} 
            isLoading={isLoading} 
          />
        </CCardBody>
      </CCard>
    </div>
  );
};

export default NursingList;
