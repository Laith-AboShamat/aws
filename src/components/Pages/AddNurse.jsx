import React, { useState } from 'react';
import { CCard, CCardBody, CCardHeader } from '@coreui/react';
import AddNurseForm from '../Forms/AddNurseForm';
import AlertComponent from '../Tables/AlertComponent';
import fetchData from '../../utils/fetchData'; // Import the fetchData function

const AddNurse = ({ setUsers }) => {
  const [newUser, setNewUser] = useState({
    givenName: '',
    familyName: '',
    phone: '',
    email: '',
    status: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [alert, setAlert] = useState({ visible: false, message: '', color: '' });

  const formatDateTime = (date) => {
    try {
      const d = new Date(date);
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}/${month}/${day}`;
    } catch (error) {
      console.error('Error formatting date:', error);
      const fallbackDate = new Date();
      return `${fallbackDate.getFullYear()}/${String(fallbackDate.getMonth() + 1).padStart(2, '0')}/${String(fallbackDate.getDate()).padStart(2, '0')}`;
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();

    if (!newUser.givenName || !newUser.familyName || !newUser.phone || !newUser.email || !newUser.status) {
      setAlert({ visible: true, message: 'Please fill in all fields.', color: 'danger' });
      return;
    }

    const currentDate = new Date();
    
    const newUserWithDates = {
      ...newUser,
      dateCreated: formatDateTime(currentDate),
      dateLastModified: formatDateTime(currentDate),
      createdBy: 'laith',
      lastModifiedBy: '',
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
        const responseBody = await response.text();
        throw new Error(`Network response was not ok: ${responseBody}`);
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

      // Fetch the updated user list after successfully adding a new user
      const newUserList = await fetchData();
      setUsers(newUserList); // Update the users state with the fetched data

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
      setAlert({ visible: true, message: 'Error adding user.', color: 'danger' });
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <div className='add-nurse-wrapper'>
      {alert.visible && (
        <AlertComponent alert={alert} setAlert={setAlert} />
      )}
      <AddNurseForm
        user={newUser}
        setUser={setNewUser}
        handleSubmit={handleAddUser}
        isEditing={isEditing}
        handleCancel={handleCancelEdit}
      />
    </div>
  );
};

export default AddNurse;
