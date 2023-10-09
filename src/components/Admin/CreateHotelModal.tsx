import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react'

type modalProps = {
  onClose: () => void,
  isOpen: boolean,
  handleSaveHotel: () => Promise<void>
}

export const CreateHotelModal = ({ onClose, isOpen, handleSaveHotel }: modalProps) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          adasdasdasdas
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleSaveHotel}>Guardar</Button>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
