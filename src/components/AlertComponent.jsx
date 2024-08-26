import { CAlert } from '@coreui/react';

const AlertComponent = ({ alert, setAlert }) => {
  return (
    <>
      {alert.visible && (
        <CAlert color={alert.color} dismissible onClose={() => setAlert({ visible: false })}>
          {alert.message}
        </CAlert>
      )}
    </>
  );
};

export default AlertComponent;
