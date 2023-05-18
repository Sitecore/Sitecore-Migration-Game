import { Badge, Grid, Group, Paper, Stack } from '@mantine/core';
import { CurrentPrompt } from 'components/Prompt/CurrentPrompt';
import { useTrait } from 'hooks/useTrait';
import { PromptService } from 'lib/PromptService';
import { IAnswer, IOption, IPrompt } from 'models/Definitions';
import React, { useEffect } from 'react';
import { FC } from 'react';

interface PromptPanelProps {
  theme: string;
  persona: string;
}

export const PromptPanel: FC<PromptPanelProps> = ({ theme, persona }) => {
  const [prompts, setPrompts] = React.useState<IPrompt[]>([]);
  const [currentPrompt, setCurrentPrompt] = React.useState<IPrompt | undefined>();
  const questions = useTrait<IPrompt[]>([]);
  const answers = useTrait<IAnswer[]>([]);

  const promptService = PromptService();

  const initializeStartPrompt = async () => {
    // setLoading(true);
    await preloadPrompts();

    questions.set([]);
    // answers.set([]);
    // setShowQuestions(true);
    // setShowResult(false);
    // setLoading(false);
  };

  const preloadPrompts = async () => {
    let data = await promptService.GetAllPromptsByThemePersona(theme, persona);

    if (data != null) {
      setPrompts(data.results);

      // Set Starting Prompt
      const currentPrompt = data.results.find((p: IPrompt) => p.start === true);

      if (currentPrompt !== undefined) {
        setCurrentPrompt(currentPrompt);
      } else {
        // TODO: Show messaging if no prompts/start prompts are found
        //setShowError(true);
        console.error('No start prompt found');
        console.log(prompts);
      }
    }
  };

  const triggerNextPrompt = () => {
    // Next Prompt is based on Pool of Questions that are not answered yet, Collection is FIFO (First In First Out)
    if (questions) {
      if (questions.get().length > 0) {
        // May need to refactor
        const nextPrompt = questions.get().shift();
        setCurrentPrompt(nextPrompt);
      } else {
        //initializeResult();
      }
    } else {
      //initializeResult();
    }
  };

  const answerSelected = (answer: IAnswer) => {
    saveAnswers(answer);
    populateQuestions(answer);

    triggerNextPrompt();
  };

  const saveAnswers = (promptAnswers: IAnswer) => {
    // Save Answers to Collection
    if (answers.get() && answers.get().length > 0) {
      answers.set([...answers.get(), promptAnswers]);
    } else {
      answers.set(new Array(promptAnswers));
    }
  };

  const populateQuestions = (answers: IAnswer) => {
    // Populate FIFO Collection of Questions based on Answers
    let nextQuestions: IPrompt[] = [];

    // TODO: Move me please, I hate looking at it myself :-)
    if (prompts !== undefined && currentPrompt !== undefined) {
      // Get current prompts option prompt ids for only answers
      let optionsSelectedWithNextPrompts: IOption[] | undefined = currentPrompt.options?.results.filter(
        (o) => answers.value.includes(o.id) && o.nextPrompts?.results !== undefined && o.nextPrompts.results.length > 0
      );

      if (optionsSelectedWithNextPrompts) {
        // Get prompt ids from options
        // Add filter for if question has already been answered
        let promptIds = optionsSelectedWithNextPrompts
          .map((o) => {
            if (o.nextPrompts?.results !== undefined && o.nextPrompts.results.length > 0) {
              return o.nextPrompts.results.map((p) => p.id);
            }

            return null;
          })
          .flat();

        if (promptIds != null) {
          // Get prompts from prompt ids
          nextQuestions = prompts.filter((p) => promptIds.includes(p.id) && p.disabled === false);

          const newQuestions = [...questions.get(), ...nextQuestions];

          questions.set(newQuestions);
        }
      }

      // Handle Current Prompt next Ids
      if (currentPrompt?.nextPrompts?.results !== undefined && currentPrompt.nextPrompts.results.length > 0) {
        // Add filter for if question has already been answered
        const nextPromptIds = currentPrompt.nextPrompts.results.map((p) => p.id);

        nextQuestions = prompts.filter((p) => nextPromptIds.includes(p.id) && p.disabled === false);

        questions.set([...questions.get(), ...nextQuestions]);
      }
    }
  };

  useEffect(() => {
    const initialize = async () => {
      await initializeStartPrompt();
    };

    initialize().catch((e) => console.error(e));

    // eslint-disable-next-line
  }, []);

  return (
    <Paper p="md" shadow="lg" withBorder>
      <Stack>
        <Grid justify="flex-end">
          <Grid.Col span={6}>
            <Badge color="red">Remaining Questions: Many</Badge>
          </Grid.Col>
          <Grid.Col span={6}>
            <Group position="right" spacing="xs">
              <Badge color="orange" variant="dot">
                {theme}
              </Badge>
              <Badge color="orange" variant="dot">
                {persona}
              </Badge>
            </Group>
          </Grid.Col>
        </Grid>
        <CurrentPrompt prompt={currentPrompt} theme={theme} persona={persona} answerSelected={answerSelected} />
        {/* <PreviousAnswers answers={answers}></PreviousAnswers> */}
      </Stack>
    </Paper>
  );
};
