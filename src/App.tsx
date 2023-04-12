import { Badge, Center, Container, Grid, Group, Loader, Paper, Stack, Title } from '@mantine/core';
import { AuthModal } from 'components/AuthModal/AuthModal';
import { ButtonGroup } from 'components/ButtonGroup/ButtonGroup';
import { MultiSelect } from 'components/MultiSelect/MultiSelect';
import { Navigation } from 'components/Navigation/Navigation';
import { SettingModal } from 'components/SettingModal/SettingModal';
import { useTrait } from 'hooks/useTrait';
import { IAnswer, IDefinition, IOption, IPrompt } from 'models/Definitions';
import React, { useEffect } from 'react';

const App = () => {
  const answers = useTrait<IAnswer[]>([]);
  const questions = useTrait<IPrompt[]>([]);
  const [theme, setTheme] = React.useState('Corporate');
  const [persona, setPersona] = React.useState('Developer');
  const [prompt, setPrompt] = React.useState<IPrompt | undefined>();
  const [loading, setLoading] = React.useState(true);
  const [authModelOpen, setAuthModalOpen] = React.useState(false);
  const [settingModalOpen, setSettingModalOpen] = React.useState(false);
  const [showResult, setShowResult] = React.useState(false);
  const [showQuestions, setShowQuestions] = React.useState(true);

  const config = React.useRef<IDefinition>();

  useEffect(() => {
    const initializeApp = async () => {
      config.current = await fetchConfig();

      initializeStartPrompt();
      setLoading(false);
    };

    initializeApp().catch((e) => console.error(e));
  }, []);

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
    if (config.current !== undefined) {
      const currentPrompt = config.current.prompts.find((p: IPrompt) => p.start === true);

      if (currentPrompt != null) {
        questions.set([]);
        answers.set([]);
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
    if (answers.get() && answers.get().length > 0) {
      answers.set([...answers.get(), ...promptAnswers]);
    } else {
      answers.set(promptAnswers);
    }
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
        //nextQuestions

        nextQuestions = config.current.prompts.filter((p) => promptIds.includes(p.id));
        const newQuestions = [...questions.get(), ...nextQuestions];

        console.log(newQuestions);
        questions.set(newQuestions);

        console.log(questions);
      }

      // Handle Current Prompt next Ids
      // if (prompt!.promptIds) {
      //   nextQuestions = config.prompts.filter((p) => prompt!.promptIds.includes(p.id));

      //   if (questions) {
      //     setNextQuestions([...questions, ...nextQuestions]);
      //   } else {
      //     setNextQuestions(nextQuestions);
      //   }
      // }
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
            config={config.current}
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
