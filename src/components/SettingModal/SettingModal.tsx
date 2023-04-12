import { Card, Modal } from '@mantine/core';
import { IDefinition } from 'models/Definitions';
import { FC } from 'react';

interface SettingModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: IDefinition | undefined;
}

export const SettingModal: FC<SettingModalProps> = ({ isOpen, onClose, config }) => {
  return (
    <Modal opened={isOpen} onClose={onClose} overlayProps={{ opacity: 0.55, blur: 3 }} size="80%">
      <Card>
        <Card.Section>Theme Selector</Card.Section>
      </Card>
    </Modal>
  );
};
