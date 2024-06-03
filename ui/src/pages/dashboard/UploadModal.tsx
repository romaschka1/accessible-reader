import { Button } from "@chakra-ui/button"
import { Modal, ModalContent, ModalFooter, ModalHeader, ModalOverlay, ModalBody } from "@chakra-ui/modal"
import { useNavigate } from "react-router-dom";
import { addBook } from "../../shared/book-service";

function UploadModal(props: any) {
  const navigate = useNavigate();

  const handleChangeFile = (event: any) => {
    const formData = new FormData();
    formData.append('inputFile', event.target.files[0]);
    console.log(formData);
    addBook(formData).then(newBookId => {
      navigate('/book/' + newBookId, { state: { id: newBookId } });
    });
  }

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Upload new book</ModalHeader>
          <ModalBody>
            <label htmlFor="file" className="sr-only">
              Choose a file
            </label>
            <input type="file" onChange={(e) => handleChangeFile(e)} />
          </ModalBody>
        <ModalFooter>
          <Button colorScheme='blue' onClick={props.onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default UploadModal;