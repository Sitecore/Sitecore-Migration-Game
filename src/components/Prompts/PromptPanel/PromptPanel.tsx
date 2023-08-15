import { Center, Stack } from '@chakra-ui/react';
import { useEngageTracker, useGameInfoContext } from 'components/Contexts';
import { CurrentPrompt } from 'components/Prompts';
import { HexagonCollection, LayoutProps, TwoColumnLayout } from 'components/ui';
import AvatarDisplay from 'components/ui/AvatarDisplay/AvatarDisplay';
import { GetNextPrompts } from 'lib/NextPrompts';
import { PromptService } from 'lib/PromptService';

import { IAnswer, IPrompt } from 'models';
import router from 'next/router';
import { FC, useEffect, useState } from 'react';

interface PromptPanelProps extends LayoutProps {}

export const PromptPanel: FC<PromptPanelProps> = (props) => {
  const gameInfoContext = useGameInfoContext();
  const tracker = useEngageTracker();
  const [loading, setLoading] = useState(true);
  const [prompts, setPrompts] = useState<IPrompt[]>([]);
  const [currentPrompt, setCurrentPrompt] = useState<IPrompt | undefined>();

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
    setLoading(true);
    await preloadPrompts();

    gameInfoContext.resetAnswers();
    gameInfoContext.questionsBank.set([]);
    setLoading(false);
  };

  const preloadPrompts = async () => {
    let data = await promptService.GetAllPromptsByThemePersona(gameInfoContext.theme!.id, gameInfoContext.persona!.id);

    if (data != null) {
      setPrompts(data.results);

      // Set Starting Prompt
      const nextPrompt = data.results.find((p: IPrompt) => p.start === true);

      if (nextPrompt !== undefined) {
        setCurrentPrompt(nextPrompt);

        await tracker.TrackPageView(
          { page: '/prompts', channel: 'WEB', language: 'EN', currency: 'USD' },
          { prompt: nextPrompt?.id }
        );
      } else {
        // TODO: Show messaging if no prompts/start prompts are found
        //setShowError(true);
        console.error('No start prompt found');
        console.log(prompts);
      }
    }
  };

  const triggerNextPrompt = async () => {
    // Next Prompt is based on Pool of Questions that are not answered yet, Collection is FIFO (First In First Out)
    if (gameInfoContext.questionsBank?.get() !== undefined) {
      if (gameInfoContext.questionsBank.get()!.length > 0) {
        const questionQueue = gameInfoContext.questionsBank.get();
        const nextPrompt = questionQueue!.shift();
        gameInfoContext.questionsBank.set(questionQueue);

        setCurrentPrompt(nextPrompt);

        await tracker.TrackPageView(
          { page: '/prompts', channel: 'WEB', language: 'EN', currency: 'USD' },
          { prompt: nextPrompt?.id }
        );
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
      showProgressBar={props.showProgressBar}
      showResetButton={props.showResetButton}
      showSaveButton={props.showSaveButton}
      leftColumn={
        <Center>
          <Stack direction={{ base: 'row', lg: 'column' }} gap={{ base: 20, lg: 0 }}>
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
