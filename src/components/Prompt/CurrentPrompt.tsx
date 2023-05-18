import { ButtonGroup } from 'components/ButtonGroup/ButtonGroup';
import { MultiSelect } from 'components/MultiSelect/MultiSelect';
import { Text } from '@mantine/core';
import { FC } from 'react';
import { IAnswer, IOption, IPrompt } from 'models/Definitions';
import { RichTextOutput } from 'components/RichTextOutput/RichTextOutput';
import React from 'react';

interface PromptProps {
  prompt: IPrompt | undefined;
  theme: string;
  persona: string;
  answerSelected: (answer: IAnswer) => void;
}

export const CurrentPrompt: FC<PromptProps> = ({ prompt, theme, persona, answerSelected }) => {
  const optionSelected = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const option = prompt?.options?.results.find((o: IOption) => o.id === e.currentTarget.value);
    if (option === undefined) {
      return;
    }

    let answer: IAnswer = {
      promptId: prompt!.id,
      prompt: prompt!.text,
      value: new Array(option.id),
      valuePrettyText: new Array(option.label),
    };

    answerSelected(answer);
  };

  const multiSelectSubmit = (selectedValues: string[]) => {
    let optionLabels: string[] = [];
    optionLabels =
      prompt?.options?.results.filter((o: IOption) => selectedValues.includes(o.id)).map((o) => o.label) || [];

    let answer: IAnswer = {
      promptId: prompt!.id,
      prompt: prompt!.text,
      value: selectedValues,
      valuePrettyText: optionLabels,
    };

    answerSelected(answer);
  };

  return (
    <>
      <Text>{prompt?.bodyText && <RichTextOutput content={prompt.bodyText} />}</Text>
      <Text>{prompt?.text}</Text>
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
