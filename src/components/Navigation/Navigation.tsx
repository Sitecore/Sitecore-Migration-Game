import { Button, Flex, Grid, Image, Tooltip } from '@mantine/core';
import Link from 'next/link';
import { FC } from 'react';
import { BiSave } from 'react-icons/bi';
import { FiSettings } from 'react-icons/fi';
import { MdRestartAlt } from 'react-icons/md';

interface NavigationProps {
  saveTrigger?: () => void;
}

export const Navigation: FC<NavigationProps> = ({ saveTrigger }) => {
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
              <Link href="/">
                <Button variant="subtle" compact>
                  <FiSettings size="24px" color="#000" />
                </Button>
              </Link>
            </Tooltip>
            <Tooltip label="Start Over">
              <Link href="/prompt">
                <Button variant="subtle" compact>
                  <MdRestartAlt size="24px" color="#000" />
                </Button>
              </Link>
            </Tooltip>
          </Flex>
        </Grid.Col>
      </Grid>
    </>
  );
};
