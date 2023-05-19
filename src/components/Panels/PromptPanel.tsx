import { Badge, Grid, Group, Paper, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { GameInfoContext, GameInfoContextType } from 'components/GameInfoContext/GameInfoContext';
import { PreviousAnswers } from 'components/PreviousAnswers/PreviousAnswers';
import { CurrentPrompt } from 'components/Prompt/CurrentPrompt';
import { Loading } from 'components/ui/Loading/Loading';
import { useTrait } from 'hooks/useTrait';
import { PromptService } from 'lib/PromptService';
import { IAnswer, IOption, IPrompt } from 'models/Definitions';
import React, { useContext, useEffect } from 'react';
import { FC } from 'react';

interface PromptPanelProps {}

export const PromptPanel: FC<PromptPanelProps> = () => {
  const gameInfoContext = useContext<GameInfoContextType>(GameInfoContext);
  const [loading, loadingActions] = useDisclosure(true);
  const [prompts, setPrompts] = React.useState<IPrompt[]>([]);
  const [currentPrompt, setCurrentPrompt] = React.useState<IPrompt | undefined>();
  const questions = useTrait<IPrompt[]>([]);
  const answers = useTrait<IAnswer[]>([]);

  const promptService = PromptService();

  useEffect(() => {
    const initialize = async () => {
      await initializeStartPrompt();
    };

    initialize().catch((e) => console.error(e));

    // eslint-disable-next-line
  }, []);

  const initializeStartPrompt = async () => {
    loadingActions.open();
    await preloadPrompts();

    questions.set([]);
    gameInfoContext.updateAnswers([]);
    loadingActions.close();
  };

  const preloadPrompts = async () => {
    let data = await promptService.GetAllPromptsByThemePersona(gameInfoContext.theme, gameInfoContext.persona);

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
      gameInfoContext.updateAnswers([...answers.get(), promptAnswers]);
    } else {
      gameInfoContext.updateAnswers([promptAnswers]);
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

  return (
    <Paper p="md" shadow="lg" withBorder>
      <Stack>
        <Grid justify="flex-end">
          <Grid.Col span={6}>
            <Badge color="red">Remaining Questions: {questions.get().length + 1}</Badge>
          </Grid.Col>
          <Grid.Col span={6}>
            <Group position="right" spacing="xs">
              <Badge color="orange" variant="dot">
                {gameInfoContext.theme}
              </Badge>
              <Badge color="orange" variant="dot">
                {gameInfoContext.persona}
              </Badge>
            </Group>
          </Grid.Col>
        </Grid>
        {loading ? (
          <Loading />
        ) : (
          <>
            <CurrentPrompt prompt={currentPrompt} answerSelected={answerSelected} />
            <PreviousAnswers />
          </>
        )}
      </Stack>
    </Paper>
  );
};
