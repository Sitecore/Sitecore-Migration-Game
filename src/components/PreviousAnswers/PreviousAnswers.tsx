import { Button, Group, Collapse, Box, List, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IAnswer } from 'models/Definitions';
import { FC } from 'react';
import { Divider } from '@mantine/core';

interface PreviousAnswersProps {
  answers: IAnswer[];
}
export const PreviousAnswers: FC<PreviousAnswersProps> = ({ answers }) => {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <>
      {answers.length > 0 && (
        <>
          <Divider my="sm" />
          <Box>
            <Group mb={5}>
              <Button variant="light" onClick={toggle}>Previous Answers</Button>
            </Group>

            <Collapse in={opened}>
              {answers.length > 0 && (
                <ul>
                  {answers.map((answer) => (
                    <Box>
                      <Text>{answer.prompt}</Text>
                      <List>
                        <List.Item>{answer.value}</List.Item>
                      </List>                    </Box>
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
