import React, { useState } from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
} from '@coreui/react';
import AddNurseForm from '../components/Forms/AddNurseForm';
import AlertComponent from '../components/Tables/AlertComponent';
import fetchData from '../utils/fetchData';

const AddNurse = ({ setUsers, showModal, handleClose, onSuccess }) => {
  const [newUser, setNewUser] = useState({
    givenName: '',
    familyName: '',
    phone: '',
    email: '',
    status: '',
    gender: '',  // New field
    birthday: '', // New field
  });
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
      return new Date().toLocaleDateString();
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();

    if (!newUser.givenName || !newUser.familyName || !newUser.phone || !newUser.email || !newUser.status || !newUser.gender || !newUser.birthday) {
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
        gender: data.gender || newUser.gender, // New field
        birthday: data.birthday || newUser.birthday, // New field
        createdBy: data.createdBy || newUser.createdBy,
        dateCreated: formatDateTime(data.dateCreated || newUser.dateCreated),
        lastModifiedBy: data.lastModifiedBy || newUser.lastModifiedBy,
        dateLastModified: formatDateTime(data.dateLastModified || newUser.dateLastModified),
      };

      const newUserList = await fetchData();
      setUsers(newUserList);

      setNewUser({
        givenName: '',
        familyName: '',
        phone: '',
        email: '',
        status: '',
        gender: '',  // Reset field
        birthday: '', // Reset field
      });

      onSuccess(newNurse);
      handleClose();
    } catch (error) {
      console.error('Error adding user:', error);
      setAlert({ visible: true, message: 'Error adding user.', color: 'danger' });
    }
  };

  return (
    <CModal visible={showModal} onClose={handleClose}>
      <CModalHeader>
        <CModalTitle>Add Nurse</CModalTitle>
      </CModalHeader>
      <CModalBody>
        {alert.visible && (
          <AlertComponent alert={alert} setAlert={setAlert} />
        )}
        <AddNurseForm
          user={newUser}
          setUser={setNewUser}
          handleSubmit={handleAddUser}
        />
      </CModalBody>
      <CModalFooter>
        <CButton color="primary" onClick={handleAddUser}>
          Add User
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default AddNurse;
