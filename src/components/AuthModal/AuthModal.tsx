import { Modal } from '@mantine/core';
import { FC } from 'react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: FC<AuthModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal opened={isOpen} onClose={onClose} overlayProps={{ opacity: 0.55, blur: 3 }} size="80%">
      In Progress
    </Modal>
  );
};
