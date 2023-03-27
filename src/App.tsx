import React, { useEffect } from 'react';
import logo from './assets/Sitecore_2022_Logo_black_1728x374.png';
import './App.css';
import { Container, MantineProvider } from '@mantine/core';
import { ButtonGroup } from 'components/ButtonGroup/ButtonGroup';
import { IDefinition, IPrompt } from 'models/Definitions';

const App = () => {
  const [selectedValues, setSelectedValues] = React.useState('');
  const [prompt, setPrompt] = React.useState<IPrompt | null>(null);
  const [output, setOutput] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [config, setConfig] = React.useState<IDefinition>();

  useEffect(() => {
    const initializeApp = async () => {
      const data = await fetchConfig();

      setConfig(data);

      if (data != null) {
        const currentPrompt = data.prompts.find((p: IPrompt) => p.start === true);

        if (currentPrompt != null) {
          setPrompt(currentPrompt);
          setOutput(currentPrompt.text);
        }
      }

      setLoading(false);
    };

    initializeApp().catch((e) => console.error(e));
  }, []);

  const triggerNextPrompt = (nextId?: string) => {
    if (config) {
      if (nextId === undefined) {
        nextId = prompt?.nextId;
      }

      console.log(nextId);

      const nextPrompt = config.prompts.find((p: IPrompt) => p.id === nextId);

      if (nextPrompt) {
        setPrompt(nextPrompt);

        if (nextPrompt.text) {
          addOutput(nextPrompt);
        }
      }
    }
  };

  const fetchConfig = async () => {
    const response = await fetch('./definition.json');
    const data = await response.json();

    return data;
  };

  const addOutput = (prompt: IPrompt) => {
    if (prompt.clearText) {
      setOutput(prompt.text);
    } else {
      setOutput(output + '\n' + prompt.text);
    }
  };

  const optionSelected = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const option = e.currentTarget.value;

    triggerNextPrompt(option);
  };

  return (
    <MantineProvider theme={{ colorScheme: 'dark' }}>
      <Container my="sm" size="sm" className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        {!loading && (
          <>
            <div id="output">{output}</div>

            {prompt?.options != null && (
              <div className="input">
                <ButtonGroup optionSelectEvent={optionSelected} options={prompt.options}></ButtonGroup>
              </div>
            )}
          </>
        )}
      </Container>
    </MantineProvider>
  );
};

export default App;
