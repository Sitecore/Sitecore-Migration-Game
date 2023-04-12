import { Button, Flex } from '@mantine/core';
import { FC } from 'react';
import { BiSave } from 'react-icons/bi';
import { FiSettings } from 'react-icons/fi';
import { MdRestartAlt } from 'react-icons/md';

interface NavigationProps {
  saveTrigger: () => void;
  settingTrigger: () => void;
  startOverTrigger: () => void;
}

export const Navigation: FC<NavigationProps> = ({ saveTrigger, settingTrigger, startOverTrigger }) => {
  return (
    <Flex mih={50} bg="white" gap="xs" justify="flex-end" align="center" direction="row" wrap="nowrap">
      <Button variant="subtle" onClick={saveTrigger} compact>
        <BiSave size="24px" color="#000" />
      </Button>
      <Button variant="subtle" onClick={settingTrigger} compact>
        <FiSettings size="24px" color="#000" />
      </Button>
      <Button variant="subtle" onClick={startOverTrigger} compact>
        <MdRestartAlt size="24px" color="#000" />
      </Button>
    </Flex>
  );
};
