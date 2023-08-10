import { Box, Button, Divider, ListItem, Text, UnorderedList, useDisclosure } from '@chakra-ui/react';
import { useGameInfoContext } from 'components/Contexts';
import { IAnswer } from 'models';
import { FC } from 'react';

interface PreviousAnswersProps {}

export const PreviousAnswers: FC<PreviousAnswersProps> = () => {
  const gameInfoContext = useGameInfoContext();
  const { getDisclosureProps, getButtonProps } = useDisclosure();

  return (
    <>
      {gameInfoContext.answers !== undefined && gameInfoContext.answers.length > 0 && (
        <>
          <Divider my="sm" />
          <Box>
            <Button variant="solid" {...getButtonProps()}>
              Previous Answers
            </Button>

            <Box {...getDisclosureProps()}>
              {gameInfoContext.answers.length > 0 && (
                <ul>
                  {gameInfoContext.answers
                    .slice()
                    .reverse()
                    .map((answer: IAnswer) => (
                      <Box mt={12} key={answer.promptId}>
                        <Text>{answer.prompt}</Text>
                        <UnorderedList>
                          {answer.valuePrettyText.map((text, i) => (
                            <ListItem key={answer.promptId + i}>{text}</ListItem>
                          ))}
                        </UnorderedList>
                      </Box>
                    ))}
                </ul>
              )}
            </Box>
          </Box>
        </>
      )}
    </>
  );
};
