import React, { useState, useEffect } from 'react';
import { CModal, CModalHeader, CModalBody, CModalFooter, CButton } from '@coreui/react';
import EditNurseForm from '../Forms/EditNurseForm';
import AlertComponent from '../Tables/AlertComponent';
import fetchData from '../../utils/fetchData';

const EditNurse = ({ user, setUsers, setAlert, handleCancel, modalVisible, setModalVisible }) => {
  const [editedUser, setEditedUser] = useState(user);
  const [alert, setAlertState] = useState({ visible: false, message: '', color: '' });

  useEffect(() => {
    setEditedUser(user);
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();

    if (!editedUser.givenName || !editedUser.familyName || !editedUser.phone || !editedUser.email || !editedUser.status) {
      setAlertState({ visible: true, message: 'Please fill in all required fields.', color: 'danger' });
      return;
    }

    const updatedUser = {
      id: editedUser.id,
      GivenName: editedUser.givenName,
      FamilyName: editedUser.familyName,
      Phone: editedUser.phone,
      Email: editedUser.email,
      Status: editedUser.status,
      LastModifiedBy: 'laith',
      DateLastModified: new Date().toLocaleDateString('en-CA'),
      CreatedBy: editedUser.createdBy || 'laith',
      DateCreated: editedUser.dateCreated
    };

    try {
      const response = await fetch('https://djnh3nx6uf.execute-api.eu-north-1.amazonaws.com/UpdateNurseData', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) throw new Error('Failed to update nurse');

      const newUserList = await fetchData();
      setUsers(newUserList);

      setAlert({ visible: true, message: 'User updated successfully!', color: 'success' });
      setModalVisible(false);
    } catch (error) {
      console.error('Error updating user:', error);
      setAlert({ visible: true, message: 'Error updating user on server.', color: 'danger' });
    }
  };

  return (
    <CModal
      size="xl"
      visible={modalVisible} 
      onClose={() => setModalVisible(false)}
      alignment="center"
      backdrop="static"
      >
      <CModalHeader closeButton>
        <h2>Edit Nurse</h2>
      </CModalHeader>
      <CModalBody>
        <AlertComponent alert={alert} setAlert={setAlertState} />
        <EditNurseForm
          user={editedUser}
          setUser={setEditedUser}
        />
      </CModalBody>
      <CModalFooter>
        <CButton color="primary" onClick={handleSave}>
          Save Changes
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default EditNurse;
