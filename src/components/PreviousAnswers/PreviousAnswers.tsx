import { Button, Group, Collapse, Box, List, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { FC, useContext } from 'react';
import { Divider } from '@mantine/core';
import { GameInfoContext, GameInfoContextType } from 'components/GameInfoContext/GameInfoContext';
import { IAnswer } from 'models';

interface PreviousAnswersProps {}

export const PreviousAnswers: FC<PreviousAnswersProps> = () => {
  const gameInfoContext = useContext<GameInfoContextType>(GameInfoContext);
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <>
      {gameInfoContext.answers !== undefined && gameInfoContext.answers.length > 0 && (
        <>
          <Divider my="sm" />
          <Box>
            <Group mb={5}>
              <Button variant="light" onClick={toggle}>
                Previous Answers
              </Button>
            </Group>

            <Collapse in={opened}>
              {gameInfoContext.answers.length > 0 && (
                <ul>
                  {
                    // Using slice() so I don't modify the original array
                    gameInfoContext.answers
                      .slice()
                      .reverse()
                      .map((answer: IAnswer) => (
                        <Box mt={12} key={answer.promptId}>
                          <Text>{answer.prompt}</Text>
                          <List>
                            {answer.valuePrettyText.map((text) => (
                              <List.Item>{text}</List.Item>
                            ))}
                          </List>
                        </Box>
                      ))
                  }
                </ul>
              )}
            </Collapse>
          </Box>
        </>
      )}
    </>
  );
};
