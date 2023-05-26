import { Button, Flex, Grid, Image, Tooltip } from '@mantine/core';
import { GameInfoContext } from 'components/ui';
import Router from 'next/router';
import { FC, useContext } from 'react';
import { BiSave } from 'react-icons/bi';
import { FiSettings } from 'react-icons/fi';
import { MdRestartAlt } from 'react-icons/md';

interface NavigationProps {
  saveTrigger?: () => void;
}

export const Navigation: FC<NavigationProps> = ({ saveTrigger }) => {
  const gameInfoContext = useContext(GameInfoContext);

  const handleAppReset = () => {
    gameInfoContext.resetAnswers();
    Router.push('/');
  };

  const handleStartOver = () => {
    gameInfoContext.resetAnswers();
    Router.push('/prompt');
  };

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
              <Button variant="subtle" compact onClick={handleAppReset}>
                <FiSettings size="24px" color="#000" />
              </Button>
            </Tooltip>
            <Tooltip label="Start Over">
              <Button variant="subtle" compact onClick={handleStartOver}>
                <MdRestartAlt size="24px" color="#000" />
              </Button>
            </Tooltip>
          </Flex>
        </Grid.Col>
      </Grid>
    </>
  );
};
