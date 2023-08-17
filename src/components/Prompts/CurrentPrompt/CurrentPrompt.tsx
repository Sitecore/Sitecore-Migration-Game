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
      <Card
        variant="elevated"
        maxW={['100%', '90%']}
        height={['auto', 'auto', '400px']}
        margin={0}
        shadow={'none'}
        paddingTop={[0, 5]}
        alignItems={'center'}
      >
        <CardBody>
          <Box
            id="Box"
            height={{ base: '250px', md: '150px', lg: '250px' }}
            overflowY={'auto'}
            marginLeft={{ base: '15px', md: '50px' }}
            marginRight={{ base: '15px', md: '50px' }}
            position={'relative'}
            marginTop={{ base: '10px', md: '25px' }}
            marginBottom={{ base: '15px', md: '0px' }}
          >
            {prompt?.bodyText && (
              <Text>
                <RichTextOutput content={prompt.bodyText} />
              </Text>
            )}
          </Box>

          <Text
            fontSize={['lg', '2xl']}
            textAlign={'center'}
            paddingLeft={{ base: '15px', md: '50px' }}
            paddingRight={{ base: '15px', md: '50px' }}
          >
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
