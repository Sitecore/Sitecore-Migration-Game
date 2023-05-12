import { GetAllPromptsQuery, GetPromptsByThemeAndPersonaQuery } from './Prompts.gql';
import { IPrompt, IResult } from 'models/Definitions';
import { chOneService } from 'lib/CHOneService';

export const PromptService = () => {
  const GetAllPromptsByThemePersona = async (
    themeId: string,
    personaId: string
  ): Promise<IResult<IPrompt[]> | null> => {
    const { data, error } = await chOneService().query({
      query: GetPromptsByThemeAndPersonaQuery,
      variables: { themeId: themeId, personaId: personaId },
    });

    if (error) {
      return null;
    }

    const results = data?.allPrompts as IResult<IPrompt[]>;

    return results;
  };

  const GetAllPrompts = async (): Promise<IResult<IPrompt[]> | null> => {
    const { error, data } = await chOneService().query({ query: GetAllPromptsQuery });

    if (error) {
      return null;
    }

    const results = data?.allPrompts;

    return results;
  };

  return { GetAllPrompts, GetAllPromptsByThemePersona };
};
