import {
  Badge,
  Center,
  Container,
  Flex,
  Grid,
  Group,
  Loader,
  LoadingOverlay,
  Paper,
  Space,
  Stack,
  Title,
} from '@mantine/core';
import { AuthModal } from 'components/AuthModal/AuthModal';
import { ButtonGroup } from 'components/ButtonGroup/ButtonGroup';
import { MultiSelect } from 'components/MultiSelect/MultiSelect';
import { Navigation } from 'components/Navigation/Navigation';
import { SettingModal } from 'components/SettingModal/SettingModal';
import { IAnswer, IDefinition, IOption, IPrompt } from 'models/Definitions';
import React, { useEffect } from 'react';

const App = () => {
  const [answers, setAnswers] = React.useState<IAnswer[] | undefined>();
  const [questions, setNextQuestions] = React.useState<IPrompt[] | undefined>();
  const [theme, setTheme] = React.useState('Corporate');
  const [persona, setPersona] = React.useState('Developer');
  const [prompt, setPrompt] = React.useState<IPrompt | undefined>();
  const [loading, setLoading] = React.useState(true);
  const [config, setConfig] = React.useState<IDefinition | undefined>();
  const [authModelOpen, setAuthModalOpen] = React.useState(false);
  const [settingModalOpen, setSettingModalOpen] = React.useState(false);
  const [showResult, setShowResult] = React.useState(false);
  const [showQuestions, setShowQuestions] = React.useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      const data = await fetchConfig();

      setConfig(data);
      initializeStartPrompt(data);
      setLoading(false);
    };

    initializeApp().catch((e) => console.error(e));
  }, []);

  const triggerNextPrompt = () => {
    // Next Prompt is based on Pool of Questions that are not answered yet, Collection is FIFO (First In First Out)
    if (questions) {
      if (questions.length > 0) {
        const nextPrompt = questions.shift();
        setPrompt(nextPrompt);
      } else {
        initializeResult();
      }
    } else {
      initializeResult();
    }
  };

  const initializeStartPrompt = (data?: IDefinition | undefined) => {
    if (!data) {
      // if data not passed, use global config state
      data = config;
    }

    if (data != null) {
      const currentPrompt = data.prompts.find((p: IPrompt) => p.start === true);

      if (currentPrompt != null) {
        setPrompt(currentPrompt);
        setShowQuestions(true);
        setShowResult(false);
      }
    }
  };

  const fetchConfig = async (): Promise<IDefinition> => {
    const response = await fetch('./definition.json');
    const data = await response.json();

    return data;
  };

  const initializeResult = () => {
    // Load MDX File with Answers collection
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
    if (answers && answers.length > 0) {
      setAnswers([...answers, ...promptAnswers]);
    } else {
      setAnswers(promptAnswers);
    }
  };

  const populateQuestions = (answers: IAnswer[]) => {
    // Populate FIFO Collection of Questions based on Answers
    let nextQuestions: IPrompt[] = [];

    if (!config) {
      // Get current prompts option prompt ids for only answers
      let optionsSelected: IOption[] | undefined = prompt!.options?.filter(
        (o) => answers.find((a) => a.value === o.value) != null
      );

      if (optionsSelected) {
        // Get prompt ids from options
        let promptIds = optionsSelected.map((o) => o.promptIds);

        // Get prompts from prompt ids
        nextQuestions = config!.prompts.filter((p) => promptIds.includes(p.id));
      }

      if (questions) {
        setNextQuestions([...questions, ...nextQuestions]);
      } else {
        setNextQuestions(nextQuestions);
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
          <SettingModal
            config={config}
            isOpen={settingModalOpen}
            onClose={() => setSettingModalOpen(false)}
          ></SettingModal>

          {showQuestions && (
            <Paper p="md" shadow="xs" withBorder>
              <Stack>
                <Grid justify="flex-end">
                  <Grid.Col span={6}>
                    <Badge color="red">Questions</Badge>
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

                <Title order={3}>{prompt?.text}</Title>
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
            <Paper p="md" shadow="xs" withBorder mt="lg" display="hidden">
              <Badge color="green">Solution</Badge>
              <Title>Coming Soon :-)</Title>
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
