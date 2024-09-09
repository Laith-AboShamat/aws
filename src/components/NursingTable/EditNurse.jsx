import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardHeader } from '@coreui/react';
import NurseFormComponent from './NurseFormComponent'; // Adjust the import if needed
import AlertComponent from './AlertComponent';

const EditNurse = ({ user, setUsers, setAlert, handleCancel }) => {
  const [editedUser, setEditedUser] = useState(user);

  useEffect(() => {
    setEditedUser(user);
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();

    if (!editedUser.givenName || !editedUser.familyName || !editedUser.phone || !editedUser.email || !editedUser.status) {
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

    const updatedUser = {
      ...editedUser,
      dateLastModified: formatDateTime(new Date()),
      lastModifiedBy: null,
    };

    try {
      const response = await fetch(`https://iswtf9imy1.execute-api.eu-north-1.amazonaws.com/UpdateNurseData/${user.id}`, {
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
      const updatedUserData = {
        ...data,
        dateLastModified: formatDateTime(data.dateLastModified),
      };

      setUsers(prevUsers => prevUsers.map(u => (u.id === user.id ? updatedUserData : u)));
      setAlert({ visible: true, message: 'User updated successfully!', color: 'success' });
      handleCancel();
    } catch (error) {
      console.error('Error updating user:', error);
      setAlert({ visible: true, message: 'Error updating user on server.', color: 'danger' });
    }
  };

  return (
    <div className='edit-nurse-wrapper'>
      <CCard className='rounded-card'>
        <CCardHeader>
          <h2 className='pad'>Edit Nurse</h2>
        </CCardHeader>
        <CCardBody>
          <AlertComponent alert={alert} setAlert={setAlert} />
          <NurseFormComponent
            user={editedUser}
            setUser={setEditedUser}
            handleSubmit={handleSave}
            isEditing={true}
            handleCancel={handleCancel}
          />
        </CCardBody>
      </CCard>
    </div>
  );
};

export default EditNurse;
