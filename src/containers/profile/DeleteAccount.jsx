import React from "react";
import { connect } from "react-redux";
import "./AccountSettingsSections.css";
import { Button, Modal, Form } from "react-bootstrap";
import {
  deleteProfileAuth,
  deleteProfileData,
  deleteProfilePhotoOnStorage,
} from "../../actions/authActions";

const DeleteAccount = (props) => {
  const [confirmModalShow, setConfirmModalShow] = React.useState(false);
  const { id } = props;

  const handleAccountDeletion = () => {
    props.deleteProfileAuth();
    props.deleteProfileData(id);
    props.deleteProfilePhotoOnStorage(id);
  };

  const ConfirmModal = (props) => {
    const [isConfirmed, setIsConfirmed] = React.useState(false);
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Deleting your account
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Are you sure?</h4>
          <p>
            Do you really want to delete your account? This process will delete
            all your data on this website and you will not be able to recover
            them.
          </p>
          <Form.Check
            type="checkbox"
            label="I agree"
            checked={isConfirmed}
            onChange={() => setIsConfirmed(!isConfirmed)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={props.onHide}>
            Cancel
          </Button>
          <Button
            variant="danger"
            disabled={!isConfirmed}
            onClick={handleAccountDeletion}
          >
            Delete My Account
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <div className="mt-5 mb-5 deleteAccount">
      <h4 className="editingTitle">Delete Account</h4>
      <p>
        Please note that this process will delete all your information
        permanently, and you will not be able to restore them.
      </p>
      <Button variant="danger" onClick={() => setConfirmModalShow(true)}>
        Delete Account
      </Button>

      <ConfirmModal
        show={confirmModalShow}
        onHide={() => setConfirmModalShow(false)}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    errMessage: state.auth.errMessage,
    errKey: state.auth.errKey,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteProfileAuth: () => dispatch(deleteProfileAuth()),
    deleteProfileData: (userID) => dispatch(deleteProfileData(userID)),
    deleteProfilePhotoOnStorage: (userID) =>
      dispatch(deleteProfilePhotoOnStorage(userID)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteAccount);
