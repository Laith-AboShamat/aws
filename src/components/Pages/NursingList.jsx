import React, { useState, useEffect } from 'react';
import { CCard, CCardBody, CCardHeader, CButton, CModal, CModalHeader, CModalBody, CModalFooter, CModalTitle } from '@coreui/react';
import AlertComponent from '../Tables/AlertComponent';
import SearchComponent from '../Tables/SearchComponent';
import NurseTableComponent from '../Tables/NurseTableComponent';
import EditNurse from './EditNurse';
import AddNurse from './AddNurse'; // Importing AddNurse
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
  const [addNurseVisible, setAddNurseVisible] = useState(false); // State for Add Nurse modal visibility
  const [lastModifiedDate, setLastModifiedDate] = useState(new Date().toLocaleDateString()); // Initialize with today's date

  // Fetch data when the component mounts
  useEffect(() => {
    const loadData = async () => {
      const data = await fetchData();
      setUsers(data);

      // Update lastModifiedDate based on fetched data
      if (data.length) {
        const lastDate = Math.max(...data.map(user => new Date(user.DateLastModified)));
        if (!isNaN(lastDate)) {
          setLastModifiedDate(new Date(lastDate).toLocaleDateString());
        } else {
          // In case of invalid date values, keep today's date
          setLastModifiedDate(new Date().toLocaleDateString());
        }
      }
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

    // Update lastModifiedDate after editing
    if (data.length) {
      const lastDate = Math.max(...data.map(user => new Date(user.DateLastModified)));
      if (!isNaN(lastDate)) {
        setLastModifiedDate(new Date(lastDate).toLocaleDateString());
      } else {
        // In case of invalid date values, keep today's date
        setLastModifiedDate(new Date().toLocaleDateString());
      }
    }

    setEditModalVisible(false); // Close modal after update
  };

  const numberOfRecords = users.length;

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

          {/* Additional Info and Button at the Bottom */}
          <div style={{ borderTop: '1px solid #ddd', paddingTop: '10px', marginTop: '20px' }}>
            <CButton color="primary" onClick={() => setAddNurseVisible(true)}>Add Nurse</CButton> {/* Button to add nurse */}
            <span style={{ marginLeft: '40px', marginRight: '40px'}}>Last Modified: {lastModifiedDate}</span>
            <span style={{ marginLeft: '20px' }}>Total Records: {numberOfRecords}</span>
          </div>

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

          {/* Add Nurse Modal */}
          <CModal 
            visible={addNurseVisible} 
            onClose={() => setAddNurseVisible(false)} 
            backdrop="static"
            size='xl'
            alignment="center"
          >
            <CModalHeader closeButton>
              <h2>Add Nurse</h2> 
            </CModalHeader>
            <CModalBody>
              <AddNurse setUsers={setUsers} setAlert={setAlert} />
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => setAddNurseVisible(false)}>
                Close
              </CButton>
            </CModalFooter>
          </CModal>
          
        </CCardBody>
      </CCard>
    </div>
  );
};

export default NursingList;
