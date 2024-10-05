import React, { useState } from 'react';
import { CForm, CFormInput, CFormSelect, CButton, CRow, CCol, CFormFeedback } from '@coreui/react';

const AddNurseForm = ({ user, setUser, handleSubmit }) => {
  const [validated, setValidated] = useState(false);

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (event) => {
    const form = event.currentTarget;
    // Check validity
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      // Only call handleSubmit if the form is valid
      handleSubmit(event);
    }
    setValidated(true); // Set validated state
  };

  return (
    <CForm noValidate validated={validated} onSubmit={handleFormSubmit}>
      <CRow>
        <CCol md="2">
          <CFormInput
            type="text"
            name="givenName"
            placeholder="Given Name"
            value={user.givenName || ''}
            onChange={handleInputChange}
            required
          />
          <CFormFeedback invalid>Please enter a given name.</CFormFeedback>
        </CCol>
        <CCol md="2">
          <CFormInput
            type="text"
            name="familyName"
            placeholder="Family Name"
            value={user.familyName || ''}
            onChange={handleInputChange}
            required
          />
          <CFormFeedback invalid>Please enter a family name.</CFormFeedback>
        </CCol>
        <CCol md="2">
          <CFormInput
            type="text"
            name="phone"
            placeholder="Phone"
            value={user.phone || ''}
            onChange={handleInputChange}
            required
          />
          <CFormFeedback invalid>Please enter a valid phone number.</CFormFeedback>
        </CCol>
        <CCol md="2">
          <CFormInput
            type="email"
            name="email"
            placeholder="Email"
            value={user.email || ''}
            onChange={handleInputChange}
            required
          />
          <CFormFeedback invalid>Please enter a valid email.</CFormFeedback>
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
          <CFormFeedback invalid>Please select a status.</CFormFeedback>
        </CCol>
        <CCol md="2">
          <CButton type="submit" color="primary">
            Add User
          </CButton>
        </CCol>
      </CRow>
    </CForm>
  );
};

export default AddNurseForm;
