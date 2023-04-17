import { Button, Card, Flex, Modal, SimpleGrid } from '@mantine/core';
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
      <Flex mih={50} gap="md" justify="center" align="center">
        <SimpleGrid cols={2}>
          <Card>
            <Card.Section>Fantasy Adventure</Card.Section>
          </Card>
          <Card>
            <Card.Section>Corporate</Card.Section>
          </Card>
        </SimpleGrid>
      </Flex>
    </Modal>
  );
};
