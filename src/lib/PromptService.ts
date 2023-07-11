import { chOneService } from 'lib/CHOneService';
import { IPrompt, IResult } from 'models';
import {
  GetAllIdPromptsQuery,
  GetAllPromptsQuery,
  GetPromptByIdQuery,
  GetPromptsByThemeAndPersonaQuery,
} from '../GraphQL/Queries/Prompts.gql';

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

  const GetAllIdPrompts = async (): Promise<string[] | null> => {
    const { error, data } = await chOneService().query({ query: GetAllIdPromptsQuery, fetchPolicy: 'no-cache' });

    if (error) {
      console.log(error);
      return null;
    }

    const results: string[] = data?.allPrompt.results.map((prompt: IPrompt) => prompt.id);

    return results;
  };

  const GetPromptById = async (id: string): Promise<IResult<IPrompt> | null> => {
    const { error, data } = await chOneService().query({
      query: GetPromptByIdQuery,
      variables: { promptId: id },
      fetchPolicy: 'no-cache',
    });

    if (error) {
      console.log(error);
      return null;
    }

    const results = data?.prompt as IResult<IPrompt>;

    return results;
  };

  return { GetAllPrompts, GetAllIdPrompts, GetAllPromptsByThemePersona, GetPromptById };
};
