import { Card, CardBody, CardFooter, Text } from '@chakra-ui/react';
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
      <Card
        variant="elevated"
        margin={0}
        padding={[0, 5]}
        alignItems={'center'}
        backgroundColor={{
          base: gameInfoContext.theme?.chakraTheme == 'corporate' ? 'whiteAlpha.700' : 'blackAlpha.500',
          md: gameInfoContext.theme?.chakraTheme == 'corporate' ? 'white' : 'blackAlpha.500',
        }}
      >
        <CardBody>
          {prompt?.bodyText && (
            <Text textAlign={'center'} marginBottom={'15px'}>
              <RichTextOutput content={prompt.bodyText} />
            </Text>
          )}

          <Text
            fontSize={['lg', '2xl']}
            fontWeight={'bold'}
            textAlign={'center'}
            paddingLeft={{ base: '15px', md: '15px' }}
            paddingRight={{ base: '15px', md: '15px' }}
          >
            {prompt?.text}
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
