import { Center, Stack } from '@chakra-ui/react';
import { useDisclosure } from '@mantine/hooks';
import { CurrentPrompt } from 'components/Prompts';
import { HexagonCollection, TwoColumnLayout, useGameInfoContext } from 'components/ui';
import AvatarDisplay from 'components/ui/AvatarDisplay/AvatarDisplay';
import { GetNextPrompts } from 'lib/NextPrompts';
import { PromptService } from 'lib/PromptService';
import { IAnswer, IPrompt } from 'models';
import router from 'next/router';
import React, { FC, useEffect } from 'react';

interface PromptPanelProps {}

export const PromptPanel: FC<PromptPanelProps> = () => {
  let gameInfoContext = useGameInfoContext();
  const [loading, loadingActions] = useDisclosure(true);
  const [prompts, setPrompts] = React.useState<IPrompt[]>([]);
  const [currentPrompt, setCurrentPrompt] = React.useState<IPrompt | undefined>();

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

    gameInfoContext.resetAnswers();
    gameInfoContext.questionsBank.set([]);
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
    if (gameInfoContext.questionsBank?.get() !== undefined) {
      if (gameInfoContext.questionsBank.get()!.length > 0) {
        const questionQueue = gameInfoContext.questionsBank.get();
        const nextPrompt = questionQueue!.shift();
        gameInfoContext.questionsBank.set(questionQueue);

        setCurrentPrompt(nextPrompt);
      } else {
        router.push('/outcome');
      }
    } else {
      router.push('/outcome');
    }
  };

  const answerSelected = async (answer: IAnswer) => {
    saveAnswers(answer);
    await populateQuestions(answer);

    triggerNextPrompt();
  };

  const saveAnswers = (promptAnswers: IAnswer) => {
    gameInfoContext.updateAnswers([promptAnswers]);
  };

  const populateQuestions = async (answers: IAnswer) => {
    const nextPrompts = await GetNextPrompts(
      currentPrompt,
      answers,
      prompts,
      gameInfoContext.questionsBank.get()!,
      gameInfoContext.answers!
    );

    await gameInfoContext.questionsBank.set(nextPrompts);
  };

  return (
    <TwoColumnLayout
      leftColumn={
        <Center>
          <Stack direction={{ base: 'row', lg: 'column' }}>
            {gameInfoContext.avatar?.fileUrl !== undefined && gameInfoContext?.persona !== undefined && (
              <AvatarDisplay fileUrl={gameInfoContext.avatar?.fileUrl} name={gameInfoContext?.persona.name} />
            )}
            <HexagonCollection />
          </Stack>
        </Center>
      }
      rightColumn={<CurrentPrompt prompt={currentPrompt} answerSelected={answerSelected} />}
      backgroundImage={currentPrompt?.background?.results[0].fileUrl}
      loading={loading}
    ></TwoColumnLayout>
  );
};
