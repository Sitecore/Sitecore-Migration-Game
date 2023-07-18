import { Modal, ModalContent, ModalOverlay } from '@chakra-ui/react';
import { FC } from 'react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: FC<AuthModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="80%">
      <ModalOverlay opacity={0.55} blur={3} />
      <ModalContent>Coming Soon... maybe</ModalContent>
    </Modal>
  );
};
