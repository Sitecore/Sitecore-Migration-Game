import { Box, Button, Collapse, Divider, Group, List, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useGameInfoContext } from 'components/ui';
import { IAnswer } from 'models';
import { FC } from 'react';

interface PreviousAnswersProps {}

export const PreviousAnswers: FC<PreviousAnswersProps> = () => {
  const gameInfoContext = useGameInfoContext();
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
                  {gameInfoContext.answers
                    .slice()
                    .reverse()
                    .map((answer: IAnswer) => (
                      <Box mt={12} key={answer.promptId}>
                        <Text>{answer.prompt}</Text>
                        <List>
                          {answer.valuePrettyText.map((text, i) => (
                            <List.Item key={answer.promptId + i}>{text}</List.Item>
                          ))}
                        </List>
                      </Box>
                    ))}
                </ul>
              )}
            </Collapse>
          </Box>
        </>
      )}
    </>
  );
};
