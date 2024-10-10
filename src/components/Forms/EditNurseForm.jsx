import React, { useState } from 'react';
import { CForm, CFormInput, CFormSelect, CFormLabel, CButton, CFormFeedback, CCol } from '@coreui/react';

const EditNurseForm = ({ user, setUser }) => {
  const [validated, setValidated] = useState(false);

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      handleSubmit(event);
    }
    setValidated(true);
  };

  return (
    <CForm noValidate validated={validated} onSubmit={handleFormSubmit}>
      <CCol md="12" className="mb-3">
        <CFormLabel htmlFor="givenName">Given Name</CFormLabel>
        <CFormInput
          type="text"
          id="givenName"
          name="givenName"
          placeholder="Enter Given Name"
          value={user.givenName || ''}
          onChange={handleInputChange}
          required
        />
        <CFormFeedback invalid>Please enter a given name.</CFormFeedback>
      </CCol>

      <CCol md="12" className="mb-3">
        <CFormLabel htmlFor="familyName">Family Name</CFormLabel>
        <CFormInput
          type="text"
          id="familyName"
          name="familyName"
          placeholder="Enter Family Name"
          value={user.familyName || ''}
          onChange={handleInputChange}
          required
        />
        <CFormFeedback invalid>Please enter a family name.</CFormFeedback>
      </CCol>

      <CCol md="12" className="mb-3">
        <CFormLabel htmlFor="phone">Phone</CFormLabel>
        <CFormInput
          type="text"
          id="phone"
          name="phone"
          placeholder="Enter Phone Number"
          value={user.phone || ''}
          onChange={handleInputChange}
          required
        />
        <CFormFeedback invalid>Please enter a valid phone number.</CFormFeedback>
      </CCol>

      <CCol md="12" className="mb-3">
        <CFormLabel htmlFor="email">Email</CFormLabel>
        <CFormInput
          type="email"
          id="email"
          name="email"
          placeholder="Enter Email"
          value={user.email || ''}
          onChange={handleInputChange}
          required
        />
        <CFormFeedback invalid>Please enter a valid email.</CFormFeedback>
      </CCol>

      <CCol md="12" className="mb-3">
        <CFormLabel htmlFor="status">Status</CFormLabel>
        <CFormSelect
          id="status"
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

      <CCol md="12" className="mb-3">
        <CFormLabel htmlFor="gender">Gender</CFormLabel>
        <CFormSelect
          id="gender"
          name="gender"
          value={user.gender || ''}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </CFormSelect>
        <CFormFeedback invalid>Please select a gender.</CFormFeedback>
      </CCol>

      <CCol md="12" className="mb-3">
        <CFormLabel htmlFor="birthday">Birthday</CFormLabel>
        <CFormInput
          type="date"
          id="birthday"
          name="birthday"
          value={user.birthday || ''}
          onChange={handleInputChange}
          required
        />
        <CFormFeedback invalid>Please enter a valid birthday.</CFormFeedback>
      </CCol>
    </CForm>
  );
};

export default EditNurseForm;
