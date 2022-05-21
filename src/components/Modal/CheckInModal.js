import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import axios from "axios";

const CheckInModal = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState("Modal");
  const [token, setToken] = useState("");

  useEffect(() => {
    const userObject = localStorage.getItem("user");
    setToken(userObject);
  }, []);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>check out</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CheckInModal;
