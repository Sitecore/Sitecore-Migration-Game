import { Box, Card, CardBody, CardFooter, Text } from '@chakra-ui/react';
import { ButtonGroup, MultiSelect } from 'components/Prompts';
import { RichTextOutput } from 'components/ui';
import { IAnswer, IOption, IPrompt } from 'models';
import React, { FC } from 'react';

interface PromptProps {
  prompt: IPrompt | undefined;
  answerSelected: (answer: IAnswer) => void;
}

export const CurrentPrompt: FC<PromptProps> = ({ prompt, answerSelected }) => {
  const optionSelected = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const option = prompt?.options?.results.find((o: IOption) => o.value === e.currentTarget.value);
    if (option === undefined) {
      return;
    }

    let answer: IAnswer = {
      promptId: prompt!.id,
      promptQuestionId: prompt!.questionid,
      prompt: prompt!.text,
      value: new Array(option.value),
      valuePrettyText: new Array(option.label),
    };

    answerSelected(answer);
  };

  const multiSelectSubmit = (selectedOptions: IOption[]) => {
    let answer: IAnswer = {
      promptId: prompt!.id,
      promptQuestionId: prompt!.questionid,
      prompt: prompt!.text,
      value: selectedOptions.map((o) => o.value),
      valuePrettyText: selectedOptions.map((o) => o.label),
    };

    answerSelected(answer);
  };

  return (
    <>
      <Card variant={['elevated', 'questionCard']} size={'lg'} maxW="100%" height="450px" margin={0} paddingTop={50}>
        <CardBody>
          <Box
            height={'250px'}
            overflowY={'auto'}
            marginLeft="70px"
            marginRight="70px"
            position={'relative'}
            marginTop={'25px'}
          >
            {prompt?.bodyText && (
              <Text>
                <RichTextOutput content={prompt.bodyText} />
              </Text>
            )}
          </Box>

          <Text fontSize="2xl" textAlign={'center'} paddingLeft={'50px'} paddingRight={'50px'}>
            {prompt?.text}
          </Text>
        </CardBody>
        <CardFooter>
          {prompt?.options?.results != null && (
            <>
              {prompt?.optionType?.results[0].name === 'Checklist' && (
                <MultiSelect multiSelectSubmit={multiSelectSubmit} options={prompt.options.results}></MultiSelect>
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
