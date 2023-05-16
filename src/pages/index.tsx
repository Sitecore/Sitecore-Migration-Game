import { Badge, Center, Container, Grid, Group, Loader, Paper, Stack, Text, Title } from '@mantine/core';
import { AuthModal } from 'components/AuthModal/AuthModal';
import { ButtonGroup } from 'components/ButtonGroup/ButtonGroup';
import { MultiSelect } from 'components/MultiSelect/MultiSelect';
import { Navigation } from 'components/Navigation/Navigation';
import { SettingModal } from 'components/SettingModal/SettingModal';
import { useTrait } from 'hooks/useTrait';
import { PromptService } from 'lib/PromptService';
import { IAnswer, IOption, IPrompt } from 'models/Definitions';
import React, { useEffect } from 'react';

const App = () => {
  const answers = useTrait<IAnswer[]>([]);
  const questions = useTrait<IPrompt[]>([]);
  const theme = useTrait<string>('corporate');
  const promptService = PromptService();

  const [persona, setPersona] = React.useState('nMeJvakIB0Kvx29f5uVdiw'); // Hard coding to Developer Persona until we complete Personas :-)
  const [prompt, setPrompt] = React.useState<IPrompt | undefined>();
  const [loading, setLoading] = React.useState(true);
  const [authModelOpen, setAuthModalOpen] = React.useState(false);
  const [settingModalOpen, setSettingModalOpen] = React.useState(true);
  const [showResult, setShowResult] = React.useState(false);
  const [prompts, setPrompts] = React.useState<IPrompt[]>([]);
  const [showQuestions, setShowQuestions] = React.useState(true);

  useEffect(() => {
    initializeApp().catch((e) => console.error(e));
    // eslint-disable-next-line
  }, []);

  const initializeApp = async () => {
    // Should maybe preload themes and personas here
    setLoading(false);
  };

  const preloadPrompts = async () => {
    let data = await promptService.GetAllPromptsByThemePersona(theme.get(), persona);

    if (data != null) {
      setPrompts(data.results);

      // Set Starting Prompt
      const currentPrompt = data.results.find((p: IPrompt) => p.start === true);

      if (currentPrompt !== undefined) {
        setPrompt(currentPrompt);
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
        setPrompt(nextPrompt);
      } else {
        initializeResult();
      }
    } else {
      initializeResult();
    }
  };

  const initializeStartPrompt = async () => {
    setLoading(true);
    await preloadPrompts();

    questions.set([]);
    answers.set([]);
    setShowQuestions(true);
    setShowResult(false);
    setLoading(false);
  };

  const initializeResult = async () => {
    setShowResult(true);
    setShowQuestions(false);
  };

  const optionSelected = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const option = e.currentTarget;

    let answers: IAnswer[] = [
      {
        promptId: prompt!.id,
        value: option.value,
      },
    ];

    saveAnswers(answers);
    populateQuestions(answers);

    triggerNextPrompt();
  };

  const multiSelectSubmit = (selectedValues: string[]) => {
    let answers: IAnswer[] = selectedValues.map((v) => {
      return {
        promptId: prompt!.id,
        value: v,
      };
    });

    saveAnswers(answers);
    populateQuestions(answers);

    triggerNextPrompt();
  };

  const saveAnswers = (promptAnswers: IAnswer[]) => {
    // Save Answers to Collection
    if (answers.get() && answers.get().length > 0) {
      answers.set([...answers.get(), ...promptAnswers]);
    } else {
      answers.set(promptAnswers);
    }
  };

  const handleSettingChange = async (newTheme: string) => {
    theme.set(newTheme);
    setSettingModalOpen(false);
    await initializeStartPrompt();
  };

  const populateQuestions = (answers: IAnswer[]) => {
    // Populate FIFO Collection of Questions based on Answers
    let nextQuestions: IPrompt[] = [];

    // TODO: Move logic to PromptService?!? (or anywhere)
    if (prompts !== undefined && prompt !== undefined) {
      // Get current prompts option prompt ids for only answers
      let optionsSelected: IOption[] | undefined = prompt!.options?.results.filter(
        (o) => answers.find((a) => a.value === o.value) != null
      );

      if (optionsSelected) {
        // Get prompt ids from options
        // Add filter for if question has already been answered
        const promptIds = optionsSelected.map((o) => {
          if (o.nextPrompts?.results !== undefined && o.nextPrompts.results.length > 0) {
            return o.nextPrompts?.results[0].id;
          }

          return null;
        });

        if (!promptIds.includes(null)) {
          // Get prompts from prompt ids
          nextQuestions = prompts.filter((p) => promptIds.includes(p.id) && p.disabled === false);

          const newQuestions = [...questions.get(), ...nextQuestions];

          questions.set(newQuestions);
        }
      }

      // Handle Current Prompt next Ids
      if (prompt?.nextPrompts?.results !== undefined && prompt.nextPrompts.results.length > 0) {
        // Add filter for if question has already been answered
        const nextPromptIds = prompt.nextPrompts.results.map((p) => p.id);

        nextQuestions = prompts.filter((p) => nextPromptIds.includes(p.id) && p.disabled === false);

        questions.set([...questions.get(), ...nextQuestions]);
      }
    }
  };

  return (
    <Container my="sm" size="sm" className="App">
      {!loading ? (
        <>
          <Navigation
            saveTrigger={() => setAuthModalOpen(true)}
            settingTrigger={() => setSettingModalOpen(true)}
            startOverTrigger={initializeStartPrompt}
          />
          <AuthModal isOpen={authModelOpen} onClose={() => setAuthModalOpen(false)}></AuthModal>
          <SettingModal isOpen={settingModalOpen} onClose={(newTheme: string) => handleSettingChange(newTheme)} />

          {showQuestions && (
            <Paper p="md" shadow="lg" withBorder>
              <Stack>
                <Grid justify="flex-end">
                  <Grid.Col span={6}>
                    <Badge color="red">Remaining Questions: {questions.get().length + 1}</Badge>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Group position="right" spacing="xs">
                      <Badge color="orange" variant="dot">
                        {theme.get()}
                      </Badge>
                      <Badge color="orange" variant="dot">
                        {persona}
                      </Badge>
                    </Group>
                  </Grid.Col>
                </Grid>
                <Text>{prompt?.text}</Text>
                {prompt?.options?.results != null && (
                  <>
                    {prompt?.optionType?.results[0].name === 'Checklist' && (
                      <>
                        <MultiSelect
                          multiSelectSubmit={multiSelectSubmit}
                          options={prompt.options.results}
                        ></MultiSelect>
                      </>
                    )}
                    {prompt?.optionType?.results[0].name === 'Buttons' && (
                      <>
                        <ButtonGroup optionSelectEvent={optionSelected} options={prompt.options.results}></ButtonGroup>
                      </>
                    )}
                  </>
                )}
              </Stack>
            </Paper>
          )}

          {showResult && (
            <Paper p="md" shadow="xs" withBorder>
              <Stack>
                <Grid justify="flex-end">
                  <Grid.Col span={6}>
                    <Badge color="green">Solution</Badge>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Group position="right" spacing="xs">
                      <Badge color="orange" variant="dot">
                        {theme.get()}
                      </Badge>
                      <Badge color="orange" variant="dot">
                        {persona}
                      </Badge>
                    </Group>
                  </Grid.Col>
                </Grid>
                <Title size="md">TODO: This is static, needs to generate from CH1 Still</Title>
                <Text>
                  Congratulations! Based on your answers, we have some guides for you that will be of interest for your
                  specific situation.
                </Text>
                <Text>Please read through this guide to get advice on options for your situation.</Text>
                <Title>Sitecore Experience platform</Title>
                <Text>
                  Based on your answers from the previous questions, you are currently running Sitecore XP. Based on
                  this, you can refer to the following general guidance for{' '}
                  <a href="https://doc.sitecore.com/developers/93/sitecore-experience-platform/en/upgrade-guide.html">
                    Sitecore XP: Sitecore XP 9.3 Upgrade Guide
                  </a>
                </Text>
              </Stack>
            </Paper>
          )}
        </>
      ) : (
        <>
          <Center>
            <Loader />
          </Center>
        </>
      )}
    </Container>
  );
};

export default App;
