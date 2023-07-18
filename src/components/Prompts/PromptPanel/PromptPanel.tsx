import { AbsoluteCenter, Avatar, Box, Center, Heading, Stack, VStack } from '@chakra-ui/react';
import { useDisclosure } from '@mantine/hooks';
import { CurrentPrompt } from 'components/Prompts';
import { HexagonCollection, TwoColumnLayout, useGameInfoContext } from 'components/ui';
import { PromptService } from 'lib/PromptService';
import { IAnswer, IOption, IPrompt } from 'models';
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
    console.log(gameInfoContext.questionsBank?.get());
    if (gameInfoContext.questionsBank?.get() !== undefined) {
      if (gameInfoContext.questionsBank.get()!.length > 0) {
        const questionQueue = gameInfoContext.questionsBank.get();
        const nextPrompt = questionQueue!.shift();
        gameInfoContext.questionsBank.set(questionQueue);

        setCurrentPrompt(nextPrompt);
      } else {
        router.push('/outcome');
      }
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

  const populateQuestions = async (answers: IAnswer) => {
    // Populate FIFO Collection of Questions based on Answers
    let nextQuestions: IPrompt[] = [];
    let newQuestions: IPrompt[] = [];

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

          newQuestions = [...gameInfoContext.questionsBank.get()!, ...nextQuestions];
        }
      }

      // Handle Current Prompt next Ids
      if (currentPrompt?.nextPrompts?.results !== undefined && currentPrompt.nextPrompts.results.length > 0) {
        // Add filter for if question has already been answered
        const nextPromptIds = currentPrompt.nextPrompts.results.map((p) => p.id);

        nextQuestions = prompts.filter((p) => nextPromptIds.includes(p.id) && p.disabled != true);

        newQuestions = [...gameInfoContext.questionsBank.get()!, ...nextQuestions, ...newQuestions];
      }
    }

    await gameInfoContext.questionsBank.set(newQuestions);
  };

  return (
    <TwoColumnLayout
      leftColumn={
        <Center>
          <Stack direction={{ base: 'row', lg: 'column' }}>
            {gameInfoContext.avatar?.fileUrl !== undefined && gameInfoContext?.persona !== undefined && (
              <VStack mb={8}>
                <Avatar width="200px" height="200px" src={gameInfoContext.avatar?.fileUrl} name="User Avatar" />
                <Box
                  backgroundColor="white"
                  width="100%"
                  height="40px"
                  position="relative"
                  boxShadow="0 8px 16px 0 rgba(84,88,89,.4)"
                >
                  <AbsoluteCenter axis="both">
                    <Heading size="md">{gameInfoContext?.persona.name}</Heading>
                  </AbsoluteCenter>
                </Box>
              </VStack>
            )}
            <HexagonCollection />
          </Stack>
        </Center>
      }
      rightColumn={<CurrentPrompt prompt={currentPrompt} answerSelected={answerSelected} />}
      backgroundImage={currentPrompt?.background?.results[0].fileUrl}
    ></TwoColumnLayout>
  );
};
