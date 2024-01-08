import { ITrait, useTrait } from 'hooks/useTrait';
import { PersonaService } from 'lib/PersonaService';
import { ThemeService } from 'lib/ThemeService';
import { IAnswer, IImage, IPersona, IPrompt, ITheme } from 'models';
import React, { FC, createContext, useCallback, useEffect } from 'react';

export const GameInfoContext = createContext<GameInfoContextType>({} as GameInfoContextType);

export interface GameInfoContextType {
  theme: ITheme | undefined;
  persona: IPersona | undefined;
  answers?: IAnswer[] | undefined;
  avatar: IImage | undefined;
  updateAnswers: (answers: IAnswer[]) => void;
  updateAvatar: (avatar: IImage) => void;
  updatePersona: (persona: string) => void;
  updateTheme: (theme: string) => void;
  questionsBank: ITrait<IPrompt[] | undefined>;
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
  const avatars = useTrait<IImage>();
  const questionTrait = useTrait<IPrompt[] | undefined>([]);
  //const [theme, setTheme] = useState<string>('-e_W0k2zO0uZPNBmYtorCQ');
  //const [persona, setPersona] = useState<string>('nMeJvakIB0Kvx29f5uVdiw');

  const initialize = useCallback(async () => {
    let persona = await PersonaService().GetPersonaById('nMeJvakIB0Kvx29f5uVdiw');

    if (persona) {
      personas.set(persona);
    }
  }, []);

  useEffect(() => {
    initialize().catch((e: any) => console.error(e));
  }, [initialize]);

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

  const handleAvatarUpdate = async (avatar: IImage) => {
    if (avatar) {
      avatars.set(avatar);
    }
  };

  return (
    <GameInfoContext.Provider
      value={{
        theme: themes.get(),
        persona: personas.get(),
        answers: savedAnswers.get(),
        questionsBank: questionTrait,
        avatar: avatars.get(),
        updateAnswers: (promptAnswers: IAnswer[]) => updateAnswers(promptAnswers),
        resetAnswers: () => resetAnswers(),
        updateTheme: async (id: string) => {
          await handleThemeUpdate(id);
        },
        updatePersona: async (id: string) => {
          await handlePersonaUpdate(id);
        },
        updateAvatar: async (avatar: IImage) => {
          await handleAvatarUpdate(avatar);
        },
      }}
    >
      {children}
    </GameInfoContext.Provider>
  );
};
