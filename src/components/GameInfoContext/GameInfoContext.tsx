import { IAnswer } from 'models/Definitions';
import { createContext, FC, useState } from 'react';

export const GameInfoContext = createContext<GameInfoContextType>({} as GameInfoContextType);

export interface GameInfoContextType {
  theme: string;
  persona: string;
  answers: IAnswer[];
  updateAnswers: (answers: IAnswer[]) => void;
  updatePersona: (persona: string) => void;
  updateTheme: (theme: string) => void;
}

interface GameInfoProviderProps {
  children: React.ReactNode;
}

export const GameInfoProvider: FC<GameInfoProviderProps> = ({ children }) => {
  const [answers, setAnswers] = useState<IAnswer[]>([]);
  const [theme, setTheme] = useState<string>('-e_W0k2zO0uZPNBmYtorCQ');
  const [persona, setPersona] = useState<string>('nMeJvakIB0Kvx29f5uVdiw');

  // const updateAnswers = (answers: IAnswer[]) => {
  //   console.log('updateAnswers not implemented');
  //   setAnswers(answers);
  // };

  return (
    <GameInfoContext.Provider
      value={{
        theme,
        persona,
        answers,
        updateAnswers: (value: IAnswer[]) => setAnswers(value),
        updateTheme: (value: string) => {
          setTheme(value);
        },
        updatePersona: (value: string) => {
          setPersona(value);
        },
      }}
    >
      {children}
    </GameInfoContext.Provider>
  );
};
