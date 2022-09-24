import { Modal, Button } from "react-bootstrap";

function UserNameModal({ showModal, hideModal }) {
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
            Edit Task
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mt-5">
              <label
                htmlFor="editNoteDesc"
                className="d-block text-center mb-2"
              >
                Label
              </label>
              <input
                type="text"
                id="editNoteDesc"
                name="editNoteDesc"
                className="d-block mx-auto"
                placeholder="Edit note description"
              />
            </div>

            <div className="my-5">
              <label
                htmlFor="editNoteContent"
                className="d-block text-center mb-2"
              >
                Label
              </label>
              <input
                type="text"
                id="editNoteContent"
                name="editNoteContent"
                className=" d-block mx-auto"
                placeholder="Edit note content"
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="editNoteTags"
                className="d-block text-center mb-2"
              >
                Label
              </label>
              <input
                type="text"
                id="editNoteTags"
                name="editNoteTags"
                className="d-block mx-auto"
                placeholder="Edit note tags"
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              hideModal(!showModal);
            }}
          >
            Close
          </Button>
          <Button variant="primary">Save Changes</Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
}
export default UserNameModal;
