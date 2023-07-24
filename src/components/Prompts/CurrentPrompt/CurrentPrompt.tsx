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
      <Box
        w="100%"
        mt={8}
        mb={4}
        p={8}
        bg="#C8C8C8"
        boxShadow="0 0 10px 0 rgba(0,0,0,.2), inset 0 0 200px hsla(0,0%,100%,.3)"
        borderRadius="lg"
        display="flex"
        alignItems="center"
        flexDirection="column"
      >
        {prompt?.bodyText && (
          <Text>
            <RichTextOutput content={prompt.bodyText} />
          </Text>
        )}
        <Text fontSize="2xl">{prompt?.text}</Text>
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
