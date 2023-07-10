import { Box, Text } from '@chakra-ui/react';
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

  const multiSelectSubmit = (selectedValues: string[]) => {
    let optionLabels: string[] = [];
    optionLabels =
      prompt?.options?.results.filter((o: IOption) => selectedValues.includes(o.value)).map((o) => o.label) || [];

    let answer: IAnswer = {
      promptId: prompt!.id,
      promptQuestionId: prompt!.questionid,
      prompt: prompt!.text,
      value: selectedValues,
      valuePrettyText: optionLabels,
    };

    answerSelected(answer);
  };

  return (
    <>
      <Box w="100%" mt={8} mb={4} p={4} bg='#C8C8C8' opacity='0.9' borderRadius='lg' display='flex' alignItems='center' flexDirection='column'>
        {prompt?.bodyText && (
          <Text>
            <RichTextOutput content={prompt.bodyText} />
          </Text>
        )}
        <Text fontSize='2xl'>{prompt?.text}</Text>
      </Box>
      {prompt?.options?.results != null && (
        <>
          {prompt?.optionType?.results[0].name === 'Checklist' && (
            <>
              <MultiSelect multiSelectSubmit={multiSelectSubmit} options={prompt.options.results}></MultiSelect>
            </>
          )}
          {prompt?.optionType?.results[0].name === 'Buttons' && (
            <>
              <ButtonGroup optionSelectEvent={optionSelected} options={prompt.options.results}></ButtonGroup>
            </>
          )}
        </>
      )}
    </>
  );
};
