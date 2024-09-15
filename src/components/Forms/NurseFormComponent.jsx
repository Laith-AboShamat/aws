import React from 'react';
import { CForm, CFormInput, CFormSelect, CButton, CRow, CCol } from '@coreui/react';

const NurseFormComponent = ({ user, setUser, handleSubmit, isEditing, handleCancel }) => {
  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <CForm onSubmit={handleSubmit}>
      <CRow>
        <CCol md="2">
          <CFormInput
            type='text'
            name='givenName'
            placeholder='Given Name'
            value={user.givenName || ''}
            onChange={handleInputChange}
            required
          />
        </CCol>
        <CCol md="2">
          <CFormInput
            type='text'
            name='familyName'
            placeholder='Family Name'
            value={user.familyName || ''}
            onChange={handleInputChange}
            required
          />
        </CCol>
        <CCol md="2">
          <CFormInput
            type='text'
            name='phone'
            placeholder='Phone'
            value={user.phone || ''}
            onChange={handleInputChange}
            required
          />
        </CCol>
        <CCol md="2">
          <CFormInput
            type='email'
            name='email'
            placeholder='Email'
            value={user.email || ''}
            onChange={handleInputChange}
            required
          />
        </CCol>
        <CCol md="2">
          <CFormSelect
            name="status"
            value={user.status || ''}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </CFormSelect>
        </CCol>
        <CCol md="2">
          <div style={{ display: 'flex', gap: '10px' }}>
            <CButton type='submit' color={isEditing ? 'success' : 'primary'}>
              {isEditing ? 'Update User' : 'Add User'}
            </CButton>
            {isEditing && <CButton color='secondary' onClick={handleCancel}>Cancel</CButton>}
          </div>
        </CCol>
      </CRow>
    </CForm>
  );
};

export default NurseFormComponent;
