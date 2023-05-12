import { Badge, Center, Container, Grid, Group, Loader, Paper, Stack, Text } from '@mantine/core';
import { AuthModal } from 'components/AuthModal/AuthModal';
import { ButtonGroup } from 'components/ButtonGroup/ButtonGroup';
import { MultiSelect } from 'components/MultiSelect/MultiSelect';
import { Navigation } from 'components/Navigation/Navigation';
import { SettingModal } from 'components/SettingModal/SettingModal';
import { useTrait } from 'hooks/useTrait';
import { PromptService } from 'lib/prompts/PromptService';
import { IAnswer, IOption, IPrompt } from 'models/Definitions';
import React, { useEffect } from 'react';

const App = () => {
  const answers = useTrait<IAnswer[]>([]);
  const questions = useTrait<IPrompt[]>([]);
  const theme = useTrait<string>('corporate');
  const promptService = PromptService();

  const [persona, setPersona] = React.useState('developer');
  const [prompt, setPrompt] = React.useState<IPrompt | undefined>();
  const [loading, setLoading] = React.useState(true);
  const [authModelOpen, setAuthModalOpen] = React.useState(false);
  const [settingModalOpen, setSettingModalOpen] = React.useState(true);
  const [showResult, setShowResult] = React.useState(true);
  const [prompts, setPrompts] = React.useState<IPrompt[]>([]);
  const [showQuestions, setShowQuestions] = React.useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      setLoading(false);
    };

    initializeApp().catch((e) => console.error(e));
    // eslint-disable-next-line
  }, []);

  const preloadPrompts = async () => {
    let data = await promptService.GetAllPromptsByThemePersona(theme.get(), persona);

    console.log(data);
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

  const initializeStartPrompt = () => {
    preloadPrompts(); // TODO: This whole function needs to be refactored
    //const currentPrompt = config.current.prompts.find((p: IPrompt) => p.start === true && p.theme === theme.get());

    questions.set([]);
    answers.set([]);
    //setPrompt(currentPrompt);
    setShowQuestions(true);
    setShowResult(false);
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

  const handleSettingChange = (newTheme: string) => {
    theme.set(newTheme);
    setSettingModalOpen(false);
    initializeStartPrompt();
  };

  const populateQuestions = (answers: IAnswer[]) => {
    // Populate FIFO Collection of Questions based on Answers
    let nextQuestions: IPrompt[] = [];

    if (config.current !== undefined) {
      // Get current prompts option prompt ids for only answers
      let optionsSelected: IOption[] | undefined = prompt!.options?.filter(
        (o) => answers.find((a) => a.value === o.value) != null
      );

      if (optionsSelected) {
        // Get prompt ids from options
        let promptIds = optionsSelected.map((o) => o.promptIds);

        // Get prompts from prompt ids
        nextQuestions = config.current.prompts.filter(
          (p) => promptIds.includes(p.id) && p.theme === theme.get() && p.disabled === false
        );
        const newQuestions = [...questions.get(), ...nextQuestions];

        questions.set(newQuestions);
      }

      // Handle Current Prompt next Ids
      if (prompt?.promptIds !== undefined && prompt.promptIds.length > 0) {
        nextQuestions = config.current.prompts.filter(
          (p) => prompt.promptIds!.includes(p.id) && p.theme === theme.get() && p.disabled === false
        );

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

                {prompt?.text != null && prompt?.text.length > 0 && (
                  <>
                    {prompt?.text.map((t, i) => {
                      return (
                        <Text size="lg" key={i}>
                          {t}
                        </Text>
                      );
                    })}
                  </>
                )}
                {prompt?.options != null && (
                  <>
                    {prompt?.optionType === 'multiselect' && (
                      <MultiSelect multiSelectSubmit={multiSelectSubmit} options={prompt.options}></MultiSelect>
                    )}
                    {prompt?.optionType === 'buttons' && (
                      <ButtonGroup optionSelectEvent={optionSelected} options={prompt.options}></ButtonGroup>
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
                <Text>Refactor</Text>
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
