import { Center, Stack } from '@chakra-ui/react';
import { useEngageTracker, useGameInfoContext } from 'components/Contexts';
import { CurrentPrompt } from 'components/Prompts';
import { HexagonCollection, LayoutProps, TwoColumnLayout, useThemeContext } from 'components/ui';
import AvatarDisplay from 'components/ui/AvatarDisplay/AvatarDisplay';
import * as GTag from 'lib/GTag';
import { GetNextPrompts } from 'lib/NextPrompts';
import { PromptService } from 'lib/PromptService';
import { v4 as uuidv4 } from 'uuid';

import { IAnswer, IPrompt } from 'models';
import router from 'next/router';
import { FC, useEffect, useState } from 'react';
import { AzureProxyService } from 'services/AzureTable/AzureProxyService';

interface PromptPanelProps extends LayoutProps { }

const defaultBackground = 'https://mms-delivery.sitecorecloud.io/api/media/v2/delivery/df4c80ea-db67-49f8-bcd3-08daadeee4f5/1821f8838e284d6fad1d483d41877aba';
const fantasyBackground = 'https://mms-delivery.sitecorecloud.io/api/media/v2/delivery/df4c80ea-db67-49f8-bcd3-08daadeee4f5/182bc6d196aa465cbf9b614ff2883eb4';

export const PromptPanel: FC<PromptPanelProps> = (props) => {
  let gameInfoContext = useGameInfoContext();
  gameInfoContext.updatePersona("HA90KhNvLEueaZO2_zsCrw");


  const themeContext = useThemeContext();
  const tracker = useEngageTracker();
  const [loading, setLoading] = useState(true);
  const [prompts, setPrompts] = useState<IPrompt[]>([]);
  const [currentPrompt, setCurrentPrompt] = useState<IPrompt | undefined>();

  const promptService = PromptService();

  if (process.browser) {
    if (gameInfoContext.persona === undefined || gameInfoContext.persona.id === undefined) {
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

    let data = await promptService.GetAllPromptsByPersona(gameInfoContext.persona!.id);

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

  const processOutcomeUrl = async (answers: IAnswer[]) => {
    setLoading(true);

    // custom event tracking for "generated_outcome" event
    await trackGenerateOutcomeEvent();

    let jsonPayload = {
      answers: answers,
      avatarId: gameInfoContext.avatar?.id,
      personaId: gameInfoContext.persona?.id,
    };

    // Check if JSON payload (answers, etc) already exists and if it does redirect
    const entityResult = await AzureProxyService().getByJsonProxy(JSON.stringify(jsonPayload));

    if (entityResult?.result?.rowKey) {
      return `/outcome/${entityResult.result.rowKey}`;
    }

    // JSON Payload doesn't exist so lets create it
    const rowKey = uuidv4();
    const postPayload = {
      rowKey,
      json: jsonPayload,
    };

    const createResult = await AzureProxyService().createEntityProxy(JSON.stringify(postPayload));

    if (createResult.success) {
      return `/outcome/${rowKey}`;
    }

    setLoading(false);
  };

  const triggerNextPrompt = async (answers: IAnswer[]) => {
    const questionBank = gameInfoContext.questionsBank.get();

    if (questionBank !== undefined && questionBank.length > 0) {
      const questionQueue = gameInfoContext.questionsBank.get();
      const nextPrompt = questionQueue!.shift();
      gameInfoContext.questionsBank.set(questionQueue);

      setCurrentPrompt(nextPrompt);

      await trackPromptPageView(nextPrompt);
    } else {
      const urlString = await processOutcomeUrl(answers);

      if (urlString) {
        router.push(urlString);
      } else {
        router.push('/outcome/error');
      }
    }
  };

  const answerSelected = async (answer: IAnswer) => {
    let updatedAnswers = await saveAnswers(answer);
    await populateQuestions(answer);

    await triggerNextPrompt(updatedAnswers);
  };

  const saveAnswers = async (promptAnswers: IAnswer): Promise<IAnswer[]> => {
    return await gameInfoContext.updateAnswers([promptAnswers]);
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

  const trackGenerateOutcomeEvent = async () => {
    await tracker.TrackEvent('generated_outcome');

    GTag.event('generated_outcome', 'Generated Outcome Page', 'true');
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
          ? defaultBackground
          : themeContext.currentTheme === 'fantasy'
            ? fantasyBackground : currentPrompt.background.results[0].fileUrl
      }
      loading={loading}
    ></TwoColumnLayout>
  );
};
