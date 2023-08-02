import { chOneService } from 'lib/CHOneService';
import { IPrompt, IResult } from 'models';
import { GetAllPromptsQuery, GetPromptsByThemeAndPersonaQuery } from '../GraphQL/Queries/Prompts.gql';

export const PromptService = () => {
  const GetAllPromptsByThemePersona = async (
    themeId: string,
    personaId: string
  ): Promise<IResult<IPrompt[]> | null> => {
    const { data, error } = await chOneService().query({
      query: GetPromptsByThemeAndPersonaQuery,
      variables: { themeId: themeId, personaId: personaId },
      fetchPolicy: 'no-cache', // Disabled Caching
    });

    if (error) {
      console.log(error);
      return null;
    }

    const results = data?.allPrompt as IResult<IPrompt[]>;

    return results;
  };

  const GetAllPrompts = async (): Promise<IResult<IPrompt[]> | null> => {
    const { error, data } = await chOneService().query({ query: GetAllPromptsQuery, fetchPolicy: 'no-cache' });

    if (error) {
      console.log(error);
      return null;
    }

    const results = data?.allPrompt;

    return results;
  };

  return { GetAllPrompts, GetAllPromptsByThemePersona };
};
