import React from 'react'
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react';
import {
  TwitterIcon, TwitterShareButton,
} from "react-share";
export default function ShareModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <div>
      <Button onClick={onOpen}>Share</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Share This Page</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Share Stuff
            <TwitterShareButton
              url={'http://localhost:3000/outcome/f3635caf-56f9-4971-a0f3-c083bad6740e'}
              title={"SOMETHING"}>
                <TwitterIcon size={32} round={true} />
            </TwitterShareButton>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
