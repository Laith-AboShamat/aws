import React, { useState } from 'react';
import { CCard, CCardBody, CCardHeader } from '@coreui/react';
import NurseFormComponent from '../Forms/NurseFormComponent';
import AlertComponent from '../Tables/AlertComponent';

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
  
  
      console.log('Response status:', response.status);
      console.log('Response body:', await response.text());
  

      console.log('Response status:', response.status);
      console.log('Response body:', await response.text());
  
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

      setUsers(prevUsers => [...prevUsers, newNurse]);

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
      setAlert({ visible: true, message: 'Error adding user. Check console for details.', color: 'danger' });
    }
  };
  

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <div className='add-nurse-wrapper'>
      <CCard className='rounded-card'>
        <CCardHeader>
          <h2 className='pad'>Add Nurse</h2>
        </CCardHeader>
        <CCardBody>
          {alert.visible && (
            <AlertComponent alert={alert} setAlert={setAlert} />
          )}
          <NurseFormComponent
            user={newUser}
            setUser={setNewUser}
            handleSubmit={handleAddUser}
            isEditing={isEditing}
            handleCancel={handleCancelEdit}
          />
        </CCardBody>
      </CCard>
    </div>
  );
};

export default AddNurse;
