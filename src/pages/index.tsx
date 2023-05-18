import { Badge, Center, Container, Grid, Group, Loader, Paper, Stack, Text, Title } from '@mantine/core';
import { AuthModal } from 'components/AuthModal/AuthModal';
import { ButtonGroup } from 'components/ButtonGroup/ButtonGroup';
import { MultiSelect } from 'components/MultiSelect/MultiSelect';
import { Navigation } from 'components/Navigation/Navigation';
import { PreviousAnswers } from 'components/PreviousAnswers/PreviousAnswers';
import { OutcomePanel } from 'components/Panels';
import { RichTextOutput } from 'components/RichTextOutput/RichTextOutput';
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
    const option = prompt?.options?.results.find((o: IOption) => o.id === e.currentTarget.value);
    if (option === undefined) {
      return;
    }

    let answers: IAnswer = {
      promptId: prompt!.id,
      prompt: prompt!.text,
      value: new Array(option.id),
      valuePrettyText: new Array(option.label),
    };

    saveAnswers(answers);
    populateQuestions(answers);

    triggerNextPrompt();
  };

  const multiSelectSubmit = (selectedValues: string[]) => {
    let optionLabels: string[] = [];
    optionLabels =
      prompt?.options?.results.filter((o: IOption) => selectedValues.includes(o.id)).map((o) => o.label) || [];

    let answers: IAnswer = {
      promptId: prompt!.id,
      prompt: prompt!.text,
      value: selectedValues,
      valuePrettyText: optionLabels,
    };

    saveAnswers(answers);
    populateQuestions(answers);

    triggerNextPrompt();
  };

  const saveAnswers = (promptAnswers: IAnswer) => {
    // Save Answers to Collection
    if (answers.get() && answers.get().length > 0) {
      answers.set([...answers.get(), promptAnswers]);
    } else {
      answers.set(new Array(promptAnswers));
    }
  };

  const handleSettingChange = async (newTheme: string) => {
    theme.set(newTheme);
    setSettingModalOpen(false);
    await initializeStartPrompt();
  };

  const populateQuestions = (answers: IAnswer) => {
    // Populate FIFO Collection of Questions based on Answers
    let nextQuestions: IPrompt[] = [];

    // TODO: Move me please, I hate looking at it myself :-)
    if (prompts !== undefined && prompt !== undefined) {
      // Get current prompts option prompt ids for only answers
      let optionsSelectedWithNextPrompts: IOption[] | undefined = prompt.options?.results.filter(
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
                <Text>{prompt?.bodyText && <RichTextOutput content={prompt.bodyText} />}</Text>
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
                <PreviousAnswers answers={answers.get()}></PreviousAnswers>
              </Stack>
            </Paper>
          )}

          {showResult && <OutcomePanel answers={answers.get()} />}
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
