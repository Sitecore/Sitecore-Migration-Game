import React, { useEffect } from 'react';
import logo from './assets/Sitecore_2022_Logo_black_1728x374.png';
import './App.css';
import { gameDefinition } from './game-definition.js';

const loadDisk = require('text-engine');

const App = () => {
  const [input, setInput] = React.useState('');
  let [disk, setDisk] = React.useState<any>(null);
  useEffect(() => {
    let input: any;

    const config = {
      getInput: () => input,
      setInput: (str: string) => {},
      println: (str: string, isImg = false) => {
        console.log(str);
      },
      setup: ({ applyInput }: any) => {
        // process.stdin.resume();
        // process.stdin.setEncoding('utf8');
        // process.stdin.on('data', (str: string) => {
        //   input = str.replace('\n', ''); // Remove line breaks.
        //   applyInput();
        // });
      },
    };

    setDisk = loadDisk(gameDefinition, config);
  }, []);

  return (
    <div className="App">
      <script>{disk}</script>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div id="output"></div>

      <div className="input">
        <span className="ml-2">&gt; </span>
        <input id="input" autoFocus spellCheck="false" />
      </div>
    </div>
  );
};

export default App;
