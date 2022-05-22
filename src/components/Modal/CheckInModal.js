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

const CheckInModal = ({ isOpen, onClose, place_id, isCheckIn, onCheckInChange, people, onPeopleChange, user }) => {
  const [label, setLabel] = useState(isCheckIn ? 'Check Out' : 'Check In');
  const [message, setMessage] = useState('')

  useEffect(() => {
    setMessage('')
  }, [isOpen])

  const handleClick = async event => {
    event.preventDefault();

    if (isCheckIn) {
      try {
        await axios.post('/api/checkout', 
          { place_id }, 
          { headers: { Authorization: `bearer ${user.token}` }}
        );
        setLabel('Check In');
        onPeopleChange(people.filter(id => id !== user.id));
        onCheckInChange(!isCheckIn);
        setMessage('Check out successfully')
      } catch (error) {
        setMessage(error.response.data.error)
      }
    } else {
      try {
        await axios.post('/api/checkin', 
          { place_id }, 
          { headers: { Authorization: `bearer ${user.token}` }}
        );
        setLabel('Check Out');
        onPeopleChange(people.concat(user.id));
        onCheckInChange(!isCheckIn);
        setMessage('Check in successfully')
      } catch (error) {
        setMessage(error.response.data.error)
      }
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{label}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{message}</ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleClick}>
              {label}
            </Button>
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
