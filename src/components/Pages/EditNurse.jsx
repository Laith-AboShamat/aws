import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardHeader } from '@coreui/react';
import NurseFormComponent from '../Forms/NurseFormComponent';
import AlertComponent from '../Tables/AlertComponent';
import fetchData from '../../utils/fetchData';

const EditNurse = ({ user, setUsers, setAlert, handleCancel }) => {
  const [editedUser, setEditedUser] = useState(user);
  const [alert, setAlertState] = useState({ visible: false, message: '', color: '' });

  useEffect(() => {
    setEditedUser(user);
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();
    
    if (!editedUser.givenName || !editedUser.familyName || !editedUser.phone || !editedUser.email || !editedUser.status) {
      setAlert({ visible: true, message: 'Please fill in all required fields.', color: 'danger' });
      return;
    }
  
    const formatDateTime = (date) => {
      try {
        const formattedDate = new Date(date).toLocaleDateString('en-CA');
        return formattedDate;
      } catch (error) {
        console.error('Error formatting date:', error);
        return new Date().toLocaleDateString('en-CA');
      }
    };

    const updatedUser = {
      id: editedUser.id,  
      GivenName: editedUser.givenName,
      FamilyName: editedUser.familyName,
      Phone: editedUser.phone,
      Email: editedUser.email,
      Status: editedUser.status,
      LastModifiedBy: "laith",
      DateLastModified: formatDateTime(new Date()),
      CreatedBy: editedUser.createdBy || "laith",
      DateCreated: editedUser.dateCreated,
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

      const newUserList = await fetchData();
      setUsers(newUserList);
  

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
          <AlertComponent alert={alert} setAlert={setAlertState} />
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
