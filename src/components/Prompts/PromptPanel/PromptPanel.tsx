import { Center, Stack } from '@chakra-ui/react';
import { useEngageTracker, useGameInfoContext } from 'components/Contexts';
import { CurrentPrompt } from 'components/Prompts';
import { HexagonCollection, LayoutProps, TwoColumnLayout } from 'components/ui';
import AvatarDisplay from 'components/ui/AvatarDisplay/AvatarDisplay';
import * as GTag from 'lib/GTag';
import { GetNextPrompts } from 'lib/NextPrompts';
import { PromptService } from 'lib/PromptService';
import { v4 as uuidv4 } from 'uuid';

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

        await trackPromptPageView(nextPrompt);
      } else {
        // TODO: Show messaging if no prompts/start prompts are found
        //setShowError(true);
        console.error('No start prompt found');
        console.log(prompts);
      }
    }
  };

  const processOutcomeUrl = async () => {
    let jsonPayload = {
      answers: gameInfoContext.answers,
      avatarId: gameInfoContext.avatar?.id,
      personaId: gameInfoContext.persona?.id,
      themeId: gameInfoContext.theme?.id,
    };

    const getEntityResult = await fetch(`/api/azure/get`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonPayload),
    });

    // Already exists send to outcome page
    if (getEntityResult.ok) {
      let entityResponse = await getEntityResult.json();

      if (entityResponse?.result && entityResponse.result.rowKey) {
        return `/outcome/${entityResponse.result.rowKey}`;
      }
    }

    const rowKey = uuidv4();
    const postPayload = {
      rowKey,
      json: jsonPayload,
    };

    // TODO: Should I create a hook service for this to simplify the implementation?
    const result = await fetch('/api/azure', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postPayload),
    });

    if (result.ok) {
      const response = await result.json();

      if (response.success) {
        return `/outcome/${rowKey}`;
      }
    }

    // TODO: Add error handling, send user to error page instead of Outcome page
    return `/outcome/`;
  };

  const triggerNextPrompt = async () => {
    const questionBank = gameInfoContext.questionsBank.get();

    if (questionBank !== undefined && questionBank.length > 0) {
      const questionQueue = gameInfoContext.questionsBank.get();
      const nextPrompt = questionQueue!.shift();
      gameInfoContext.questionsBank.set(questionQueue);

      setCurrentPrompt(nextPrompt);

      await trackPromptPageView(nextPrompt);
    } else {
      const urlString = await processOutcomeUrl();

      router.push(urlString);
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

  const trackPromptPageView = async (prompt: IPrompt | undefined) => {
    if (prompt === undefined) {
      return;
    }

    await tracker.TrackPageView(
      { page: '/prompts', channel: 'WEB', language: 'EN', currency: 'USD' },
      { prompt: prompt?.id }
    );
    GTag.pageView(`/prompts/${prompt?.id}`);
  };

  return (
    <TwoColumnLayout
      showProgressBar={props.showProgressBar}
      showResetButton={props.showResetButton}
      showSaveButton={props.showSaveButton}
      leftColumn={
        <Center>
          <Stack direction={{ base: 'row', md: 'column' }} gap={{ base: 10, md: 0 }} marginBottom={[2, 'auto']}>
            {gameInfoContext.avatar?.fileUrl !== undefined && gameInfoContext?.persona !== undefined && (
              <AvatarDisplay fileUrl={gameInfoContext.avatar?.fileUrl} name={gameInfoContext?.persona.name} />
            )}
            <HexagonCollection />
          </Stack>
        </Center>
      }
      rightColumn={<CurrentPrompt prompt={currentPrompt} answerSelected={answerSelected} />}
      backgroundImage={
        currentPrompt?.background?.results[0] === undefined || currentPrompt.background.results[0].fileUrl === ''
          ? gameInfoContext.theme?.chakraTheme == 'corporate'
            ? 'https://mms-delivery.sitecorecloud.io/api/media/v2/delivery/df4c80ea-db67-49f8-bcd3-08daadeee4f5/1821f8838e284d6fad1d483d41877aba'
            : 'https://mms-delivery.sitecorecloud.io/api/media/v2/delivery/df4c80ea-db67-49f8-bcd3-08daadeee4f5/182bc6d196aa465cbf9b614ff2883eb4'
          : currentPrompt?.background?.results[0].fileUrl
      }
      loading={loading}
    ></TwoColumnLayout>
  );
};
