import { Paper, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { CurrentPrompt, PreviousAnswers } from 'components/Prompts';
import { InfoBar, Loading, useGameInfoContext } from 'components/ui';
import { useTrait } from 'hooks/useTrait';
import { PromptService } from 'lib/PromptService';
import { IAnswer, IOption, IPrompt } from 'models';
import router from 'next/router';
import React, { FC, useEffect } from 'react';

interface PromptPanelProps {}

export const PromptPanel: FC<PromptPanelProps> = () => {
  const gameInfoContext = useGameInfoContext();
  const [loading, loadingActions] = useDisclosure(true);
  const [prompts, setPrompts] = React.useState<IPrompt[]>([]);
  const [currentPrompt, setCurrentPrompt] = React.useState<IPrompt | undefined>();
  const questions = useTrait<IPrompt[]>([]);

  const promptService = PromptService();

  if (process.browser) {
    if (gameInfoContext.theme === undefined || !gameInfoContext.theme.id) {
      if (!(typeof window === undefined)) {
        window.history.pushState(null, '', '/');
        window.location.reload();
      }
    }
  }

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
    loadingActions.close();
  };

  const preloadPrompts = async () => {
    let data = await promptService.GetAllPromptsByThemePersona(gameInfoContext.theme!.id, gameInfoContext.persona!.id);

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
        router.push('/outcome');
      }
    } else {
      // TODO: Show messaging if no prompts/start prompts are found
    }
  };

  const answerSelected = (answer: IAnswer) => {
    saveAnswers(answer);
    populateQuestions(answer);

    triggerNextPrompt();
  };

  const saveAnswers = (promptAnswers: IAnswer) => {
    gameInfoContext.updateAnswers([promptAnswers]);
  };

  const populateQuestions = (answers: IAnswer) => {
    // Populate FIFO Collection of Questions based on Answers
    let nextQuestions: IPrompt[] = [];

    // TODO: Move me please, I hate looking at it myself :-)
    if (prompts !== undefined && currentPrompt !== undefined) {
      // Get current prompts option prompt ids for only answers
      let optionsSelectedWithNextPrompts: IOption[] | undefined = currentPrompt.options?.results.filter(
        (o) =>
          answers.value.includes(o.value) && o.nextPrompts?.results !== undefined && o.nextPrompts.results.length > 0
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
          nextQuestions = prompts.filter((p) => promptIds.includes(p.id) && p.disabled != true);

          const newQuestions = [...questions.get(), ...nextQuestions];

          questions.set(newQuestions);
        }
      }

      // Handle Current Prompt next Ids
      if (currentPrompt?.nextPrompts?.results !== undefined && currentPrompt.nextPrompts.results.length > 0) {
        // Add filter for if question has already been answered
        const nextPromptIds = currentPrompt.nextPrompts.results.map((p) => p.id);

        nextQuestions = prompts.filter((p) => nextPromptIds.includes(p.id) && p.disabled != true);

        questions.set([...questions.get(), ...nextQuestions]);
      }
    }
  };

  return (
    <Paper p="md" shadow="lg" withBorder>
      <Stack>
        <InfoBar remainingQuestions={questions.get()} />
        {loading ? (
          <Loading message="Loading prompts..." />
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
