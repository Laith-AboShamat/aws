import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardHeader, CButton, CModal, CModalHeader, CModalBody, CModalFooter } from '@coreui/react';
import AlertComponent from '../Tables/AlertComponent';
import SearchComponent from '../Tables/SearchComponent';
import NurseTableComponent from '../Tables/NurseTableComponent';
import EditNurse from './EditNurse';
import DotLoader from 'react-spinners/DotLoader';
import fetchData from '../../utils/fetchData';

const NursingList = () => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  const [alert, setAlert] = useState({ visible: false, message: '', color: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const [deleteUserId, setDeleteUserId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Fetch data when the component mounts
  useEffect(() => {
    const loadData = async () => {
      const data = await fetchData();
      setUsers(data);
      setIsLoading(false);
    };
    loadData();
  }, []);

  // Handle showing the delete confirmation modal
  const handleDeleteClick = (id) => {
    setDeleteUserId(id);
    setShowDeleteModal(true); // Open delete modal
  };

  // Handle deletion confirmed in the modal
  const confirmDelete = async () => {
    try {
      const response = await fetch('https://7krr77tjrd.execute-api.eu-north-1.amazonaws.com/DeleteNurseData', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: deleteUserId })
      });

      if (!response.ok) throw new Error('Failed to delete nurse');

      setUsers(users.filter(user => user.id !== deleteUserId));
      setAlert({ visible: true, message: 'Nurse deleted successfully.', color: 'success' });
    } catch (error) {
      console.error('Error deleting nurse:', error);
      setAlert({ visible: true, message: 'Error deleting nurse from server.', color: 'danger' });
    } finally {
      setShowDeleteModal(false); // Close modal after delete
      setDeleteUserId(null); // Clear selected ID
    }
  };

  const filteredUsers = users.filter(user =>
    Object.values(user).some(value =>
      (value ? value.toString().toLowerCase() : '').includes(search.toLowerCase())
    )
  );

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setEditModalVisible(true); // Open edit modal
  };

  const handleCancelEdit = () => {
    setSelectedUser(null);
    setEditModalVisible(false); // Close edit modal
  };

  const handleUpdateSuccess = async () => {
    const data = await fetchData(); // Fetch updated data after editing
    setUsers(data); // Update users state
    setEditModalVisible(false); // Close modal after update
  };

  return (
    <div className='nursing-list-wrapper'>
      <CCard className='rounded-card'>
        <CCardHeader>
          <h2 className='pad'>Nursing List</h2>
        </CCardHeader>
        <CCardBody>
          <AlertComponent alert={alert} setAlert={setAlert} />
          <SearchComponent search={search} setSearch={setSearch} />

          {isLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
              <DotLoader color="#36D7B7" />
            </div>
          ) : (
            <NurseTableComponent 
              users={filteredUsers} 
              handleEditClick={handleEditClick} 
              handleDeleteClick={handleDeleteClick}
              isLoading={isLoading} 
            />
          )}

          {/* Delete Confirmation Modal */}
          <CModal 
            visible={showDeleteModal} 
            onClose={() => setShowDeleteModal(false)} 
            backdrop="static"
          >
            <CModalHeader closeButton>
              Confirm Deletion
            </CModalHeader>
            <CModalBody>
              Are you sure you want to delete this nurse? This action cannot be undone.
            </CModalBody>
            <CModalFooter>
              <CButton color="danger" onClick={confirmDelete}>
                Delete
              </CButton>
              <CButton color="secondary" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </CButton>
            </CModalFooter>
          </CModal>

          {/* Edit Nurse Modal */}
          <EditNurse 
            user={selectedUser} 
            setUsers={setUsers} 
            setAlert={setAlert} 
            handleCancel={handleCancelEdit} 
            onSuccess={handleUpdateSuccess} 
            modalVisible={editModalVisible} 
            setModalVisible={setEditModalVisible} 
          />

        </CCardBody>
      </CCard>
    </div>
  );
};

export default NursingList;
