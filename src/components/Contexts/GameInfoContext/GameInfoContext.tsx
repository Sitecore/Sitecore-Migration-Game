import { ITrait, useTrait } from 'hooks/useTrait';
import { PersonaService } from 'lib/PersonaService';
import { IAnswer, IImage, IPersona, IPrompt } from 'models';
import React, { FC, createContext, useCallback, useEffect } from 'react';

export const GameInfoContext = createContext<GameInfoContextType>({} as GameInfoContextType);

export interface GameInfoContextType {
  persona: IPersona | undefined;
  answers?: IAnswer[] | undefined;
  avatar: IImage | undefined;
  updateAnswers: (answers: IAnswer[]) => Promise<IAnswer[]>;
  updateAvatar: (avatar: IImage) => void;
  updatePersona: (persona: string) => void;
  questionsBank: ITrait<IPrompt[] | undefined>;
  resetAnswers: () => void;
}

export const useGameInfoContext = () => React.useContext(GameInfoContext);

interface GameInfoProviderProps {
  children: React.ReactNode;
}

export const GameInfoProvider: FC<GameInfoProviderProps> = ({ children }) => {
  const savedAnswers = useTrait<IAnswer[]>([]);
  const personas = useTrait<IPersona>();
  const avatars = useTrait<IImage>();
  const questionTrait = useTrait<IPrompt[] | undefined>([]);

  const initialize = useCallback(async () => {
    let persona = await PersonaService().GetPersonaById('nMeJvakIB0Kvx29f5uVdiw');

    if (persona) {
      personas.set(persona);
    }
  }, []);

  useEffect(() => {
    initialize().catch((e: any) => console.error(e));
  }, [initialize]);

  const updateAnswers = async (promptAnswers: IAnswer[]): Promise<IAnswer[]> => {
    return new Promise((resolve) => {
      let newAnswers = savedAnswers.get();

      if (newAnswers && newAnswers.length > 0) {
        newAnswers = [...newAnswers, ...promptAnswers];
      } else {
        newAnswers = promptAnswers;
      }
      savedAnswers.set(newAnswers);
      resolve(newAnswers);
    });
  };

  const resetAnswers = () => {
    savedAnswers.set([]);
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
        persona: personas.get(),
        answers: savedAnswers.get(),
        questionsBank: questionTrait,
        avatar: avatars.get(),
        updateAnswers: async (promptAnswers: IAnswer[]) => await updateAnswers(promptAnswers),
        resetAnswers: () => resetAnswers(),
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
