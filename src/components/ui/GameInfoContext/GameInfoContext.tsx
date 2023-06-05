import { useTrait } from 'hooks/useTrait';
import { PersonaService } from 'lib/PersonaService';
import { ThemeService } from 'lib/ThemeService';
import { IAnswer, IPersona, ITheme } from 'models';
import React, { FC, createContext, useEffect } from 'react';

export const GameInfoContext = createContext<GameInfoContextType>({} as GameInfoContextType);

export interface GameInfoContextType {
  theme: ITheme | undefined;
  persona: IPersona | undefined;
  answers?: IAnswer[] | undefined;
  updateAnswers: (answers: IAnswer[]) => void;
  updatePersona: (persona: string) => void;
  updateTheme: (theme: string) => void;
  resetAnswers: () => void;
}

export const useGameInfoContext = () => React.useContext(GameInfoContext);

interface GameInfoProviderProps {
  children: React.ReactNode;
}

export const GameInfoProvider: FC<GameInfoProviderProps> = ({ children }) => {
  const savedAnswers = useTrait<IAnswer[]>([]);
  const themes = useTrait<ITheme>();
  const personas = useTrait<IPersona>();
  //const [theme, setTheme] = useState<string>('-e_W0k2zO0uZPNBmYtorCQ');
  //const [persona, setPersona] = useState<string>('nMeJvakIB0Kvx29f5uVdiw');

  useEffect(() => {
    const initialize = async () => {
      let persona = await PersonaService().GetPersonaById('nMeJvakIB0Kvx29f5uVdiw');

      if (persona) {
        personas.set(persona);
      }
    };

    initialize().catch((e) => console.error(e));
  }, []);

  const updateAnswers = (promptAnswers: IAnswer[]) => {
    if (savedAnswers.get() && savedAnswers.get().length > 0) {
      savedAnswers.set([...savedAnswers.get(), ...promptAnswers]);
    } else {
      savedAnswers.set(promptAnswers);
    }
  };

  const resetAnswers = () => {
    savedAnswers.set([]);
  };

  const handleThemeUpdate = async (id: string) => {
    const result = await ThemeService().GetThemeById(id);

    if (result) {
      themes.set(result);
    }
  };

  const handlePersonaUpdate = async (id: string) => {
    const result = await PersonaService().GetPersonaById(id);

    if (result) {
      personas.set(result);
    }
  };

  return (
    <GameInfoContext.Provider
      value={{
        theme: themes.get(),
        persona: personas.get(),
        answers: savedAnswers.get(),
        updateAnswers: (promptAnswers: IAnswer[]) => updateAnswers(promptAnswers),
        resetAnswers: () => resetAnswers(),
        updateTheme: async (id: string) => {
          await handleThemeUpdate(id);
        },
        updatePersona: async (id: string) => {
          await handlePersonaUpdate(id);
        },
      }}
    >
      {children}
    </GameInfoContext.Provider>
  );
};
