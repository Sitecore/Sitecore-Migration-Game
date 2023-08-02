import { IPersona, IResult } from 'models';
import { GetPersonaByIdQuery, GetPersonasByThemeIdQuery } from '../GraphQL/Queries/Personas.gql';
import { chOneService } from './CHOneService';

export const PersonaService = () => {
  const GetPersonaById = async (personaId: string): Promise<IPersona | undefined> => {
    const { error, data } = await chOneService().query({ query: GetPersonaByIdQuery, variables: { id: personaId } });

    if (error) {
      console.log(error);
      return undefined;
    }

    const results = data?.gamePersona as IPersona;

    return results;
  };

  const GetPersonasByTheme = async (themeId: string): Promise<IResult<IPersona[]> | undefined> => {
    const { error, data } = await chOneService().query({
      query: GetPersonasByThemeIdQuery,
      variables: { id: themeId },
    });

    if (error) {
      console.log(error);

      return undefined;
    }

    const results = data?.allGamePersona as IResult<IPersona[]>;

    return results;
  };

  return { GetPersonaById, GetPersonasByTheme };
};
