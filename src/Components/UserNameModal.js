import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

function UserNameModal({
  showModal,
  hideModal,
  userScore,
  userSaveData,
  setUserSaveData,
}) {
  const [userName, setUserName] = useState("");

  const saveUserData = (e) => {
    e.preventDefault();
    if (!userSaveData) {
      setUserSaveData([
        {
          id: uuidv4(),
          name: userName,
          score: userScore,
        },
      ]);
    } else if ((userName, userScore)) {
      setUserSaveData((prev) => [
        ...prev,
        {
          id: uuidv4(),
          name: userName,
          score: userScore,
        },
      ]);
    }

    setUserName("");
  };

  return (
    <Modal
      className="note-modal"
      show={showModal}
      onHide={() => {
        hideModal(!showModal);
      }}
    >
      <div className="modal-postit">
        <Modal.Header closeButton>
          <Modal.Title className="position-absolute start-45">
            Game Over!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mt-5">
              <label
                htmlFor="editNoteDesc"
                className="d-block text-center mb-2 fs-5"
              >
                Enter Name:
              </label>
              <input
                type="text"
                id="editNoteDesc"
                name="editNoteDesc"
                className="d-block mx-auto text-center fs-5"
                placeholder="..."
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={(e) => {
              hideModal(!showModal);
              saveUserData(e);
            }}
          >
            Save
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
}
export default UserNameModal;
