import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardHeader } from '@coreui/react';
import AlertComponent from '../Tables/AlertComponent';
import SearchComponent from '../Tables/SearchComponent';
import NurseTableComponent from '../Tables/NurseTableComponent';
import AddNurse from './AddNurse';
import EditNurse from './EditNurse';
import DotLoader from 'react-spinners/DotLoader';
import fetchData from '../../utils/fetchData'; // Import the new fetchData function

const NursingList = () => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  const [alert, setAlert] = useState({ visible: false, message: '', color: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Fetch data when the component mounts
  useEffect(() => {
    const loadData = async () => {
      const data = await fetchData();
      setUsers(data);
      setIsLoading(false);
    };
    loadData();
  }, []);

  const handleDeleteClick = async (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this nurse?');
    if (!isConfirmed) return;

    try {
      const response = await fetch('https://7krr77tjrd.execute-api.eu-north-1.amazonaws.com/DeleteNurseData', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })
      });
  
      if (!response.ok) throw new Error('Failed to delete nurse');

      setUsers(users.filter(user => user.id !== id));
      setAlert({ visible: true, message: 'Nurse deleted successfully.', color: 'success' });
    } catch (error) {
      console.error('Error deleting nurse:', error);
      setAlert({ visible: true, message: 'Error deleting nurse from server.', color: 'danger' });
    }
  };

  const filteredUsers = users.filter(user =>
    Object.values(user).some(value =>
      (value ? value.toString().toLowerCase() : '').includes(search.toLowerCase())
    )
  );

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setSelectedUser(null);
  };

  const handleUpdateSuccess = async () => {
    const data = await fetchData(); // Fetch updated data after editing
    setUsers(data); // Update users state
    setIsEditing(false);
  };

  return (
    <div className='nursing-list-wrapper'>
      <CCard className='rounded-card'>
        <CCardHeader>
          <h2 className='pad'>Nursing List</h2>
        </CCardHeader>
        <CCardBody>
          <AlertComponent alert={alert} setAlert={setAlert} />
          <SearchComponent search={search} setSearch={setSearch} />

          {isEditing ? (
            <EditNurse 
              user={selectedUser} 
              setUsers={setUsers} 
              setAlert={setAlert} 
              handleCancel={handleCancelEdit} 
              onSuccess={handleUpdateSuccess} // Refreshes after successful update
            />
          ) : (
            isLoading ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
                <DotLoader color="#36D7B7" />
              </div>
            ) : (
              <NurseTableComponent 
                users={filteredUsers} 
                handleEditClick={handleEditClick} 
                handleDeleteClick={handleDeleteClick}
                isLoading={isLoading} 
              />
            )
          )}
        </CCardBody>
      </CCard>
    </div>
  );
};

export default NursingList;
