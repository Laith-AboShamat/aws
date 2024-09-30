import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardHeader } from '@coreui/react';
import NurseFormComponent from '../Forms/NurseFormComponent';
import AlertComponent from '../Tables/AlertComponent';

const EditNurse = ({ user, setUsers, setAlert, handleCancel }) => {
  const [editedUser, setEditedUser] = useState(user);
  const [alert, setAlertState] = useState({ visible: false, message: '', color: '' });

  useEffect(() => {
    setEditedUser(user);
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();
    
    // Validation: Ensure all required fields are filled
    if (!editedUser.givenName || !editedUser.familyName || !editedUser.phone || !editedUser.email || !editedUser.status) {
      setAlert({ visible: true, message: 'Please fill in all required fields.', color: 'danger' });
      return;
    }
  
    // Format date to 'YYYY-MM-DD'
    const formatDateTime = (date) => {
      try {
        const formattedDate = new Date(date).toLocaleDateString('en-CA');
        return formattedDate;
      } catch (error) {
        console.error('Error formatting date:', error);
        return new Date().toLocaleDateString('en-CA');
      }
    };
  
    // Prepare updated user data with proper casing for the keys
    const updatedUser = {
      id: editedUser.id,  // Make sure to include the 'id' for the update
      GivenName: editedUser.givenName,
      FamilyName: editedUser.familyName,
      Phone: editedUser.phone,
      Email: editedUser.email,
      Status: editedUser.status,
      LastModifiedBy: "laith",  // Ensure 'LastModifiedBy' is set to 'laith'
      DateLastModified: formatDateTime(new Date()),  // Update with current date
      CreatedBy: editedUser.createdBy || "laith",  // Set 'CreatedBy' to 'laith' if null
      DateCreated: editedUser.dateCreated,  // Retain the original 'DateCreated'
    };
  
    try {
      // Make PUT request to update the user
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
  
      // Get updated data from response
      const data = await response.json();
      
      // Refresh users list with updated data
      setUsers(prevUsers => prevUsers.map(u => (u.id === user.id ? {
        ...u,
        GivenName: data.updated_attributes.GivenName,
        FamilyName: data.updated_attributes.FamilyName,
        Phone: data.updated_attributes.Phone,
        Email: data.updated_attributes.Email,
        Status: data.updated_attributes.Status,
        LastModifiedBy: "laith",
        DateLastModified: formatDateTime(new Date()),
      } : u)));
  
      // Show success alert and close the edit form
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
