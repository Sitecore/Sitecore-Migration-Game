import { Button, Flex, Tooltip, Image, Grid, Container } from '@mantine/core';
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
    <>
      <Grid align="flex-end">
        <Grid.Col span={8}>
          <Image src="/logo.jpg" />
        </Grid.Col>
        <Grid.Col span={4}>
          <Flex mih={50} bg="white" gap="xs" justify="flex-end" align="center" direction="row" wrap="nowrap">
            <Tooltip label="Save your progress">
              <Button variant="subtle" onClick={saveTrigger} compact>
                <BiSave size="24px" color="#000" />
              </Button>
            </Tooltip>
            <Tooltip label="Change Theme and Restart Quest" multiline>
              <Button variant="subtle" onClick={settingTrigger} compact>
                <FiSettings size="24px" color="#000" />
              </Button>
            </Tooltip>
            <Tooltip label="Start Over">
              <Button variant="subtle" onClick={startOverTrigger} compact>
                <MdRestartAlt size="24px" color="#000" />
              </Button>
            </Tooltip>
          </Flex>
        </Grid.Col>
      </Grid>
    </>
  );
};
