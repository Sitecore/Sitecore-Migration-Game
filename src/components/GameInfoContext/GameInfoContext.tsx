import { useTrait } from 'hooks/useTrait';
import { IAnswer } from 'models/Definitions';
import { createContext, FC, useState } from 'react';

export const GameInfoContext = createContext<GameInfoContextType>({} as GameInfoContextType);

export interface GameInfoContextType {
  theme: string;
  persona: string;
  answers?: IAnswer[] | undefined;
  updateAnswers: (answers: IAnswer[]) => void;
  updatePersona: (persona: string) => void;
  updateTheme: (theme: string) => void;
}

interface GameInfoProviderProps {
  children: React.ReactNode;
}

export const GameInfoProvider: FC<GameInfoProviderProps> = ({ children }) => {
  const savedAnswers = useTrait<IAnswer[]>([]);
  const [theme, setTheme] = useState<string>('-e_W0k2zO0uZPNBmYtorCQ');
  const [persona, setPersona] = useState<string>('nMeJvakIB0Kvx29f5uVdiw');

  const updateAnswers = (promptAnswers: IAnswer[]) => {
    console.log(promptAnswers);
    if (savedAnswers.get() && savedAnswers.get().length > 0) {
      savedAnswers.set([...savedAnswers.get(), ...promptAnswers]);
    } else {
      savedAnswers.set(promptAnswers);
    }

    console.log(savedAnswers);
  };

  return (
    <GameInfoContext.Provider
      value={{
        theme,
        persona,
        answers: savedAnswers.get(),
        updateAnswers: (promptAnswers: IAnswer[]) => updateAnswers(promptAnswers),
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
