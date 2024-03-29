import { Box, Card, CardBody, CardFooter, Text } from '@chakra-ui/react';
import { useGameInfoContext } from 'components/Contexts';
import { ButtonGroup, MultiSelect } from 'components/Prompts';
import { RichTextOutput } from 'components/ui';
import { IAnswer, IOption, IPrompt } from 'models';
import React, { FC } from 'react';

interface PromptProps {
  prompt: IPrompt | undefined;
  answerSelected: (answer: IAnswer) => void;
}

export const CurrentPrompt: FC<PromptProps> = ({ prompt, answerSelected }) => {
  const gameInfoContext = useGameInfoContext();
  const optionSelected = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const option = prompt?.options?.results.find((o: IOption) => o.value === e.currentTarget.value);
    if (option === undefined) {
      return;
    }

    let answer: IAnswer = {
      promptId: prompt!.id,
      promptQuestionId: prompt!.questionId,
      value: new Array(option.value),
    };

    await answerSelected(answer);
  };

  const multiSelectSubmit = async (selectedOptions: IOption[]) => {
    let answer: IAnswer = {
      promptId: prompt!.id,
      promptQuestionId: prompt!.questionId,
      value: selectedOptions.map((o) => o.value),
    };

    await answerSelected(answer);
  };

  return (
    <>
      <Card
        variant="elevated"
        margin={0}
        padding={[0, 5]}
        alignItems={'center'}
      >
        <CardBody>
          {prompt?.bodyText && (
            <Box textAlign={'center'} marginBottom={'15px'}>
              <RichTextOutput content={prompt.bodyText} />
            </Box>
          )}

          <Text
            fontSize={['lg', '2xl']}
            fontWeight={'bold'}
            textAlign={'center'}
            paddingLeft={{ base: '15px', md: '15px' }}
            paddingRight={{ base: '15px', md: '15px' }}
          >
            {prompt?.question}
          </Text>
        </CardBody>
        <CardFooter padding={'15px'}>
          {prompt?.options?.results != null && (
            <>
              {prompt?.optionType?.results[0].name === 'Checklist' && (
                <MultiSelect
                  currentPrompt={prompt.id}
                  multiSelectSubmit={multiSelectSubmit}
                  options={prompt.options.results}
                ></MultiSelect>
              )}
              {prompt?.optionType?.results[0].name === 'Buttons' && (
                <>
                  <ButtonGroup optionSelectEvent={optionSelected} options={prompt.options.results}></ButtonGroup>
                </>
              )}
            </>
          )}
        </CardFooter>
      </Card>
    </>
  );
};
