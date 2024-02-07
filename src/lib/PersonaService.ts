import { IPersona, IResult } from 'models';
import { GetPersonaByIdQuery, GetPersonasQuery } from '../GraphQL/Queries/Personas.gql';
import { chOneService } from './CHOneService';

export const PersonaService = () => {
  const GetPersonaById = async (personaId: string): Promise<IPersona | undefined> => {
    const { error, data } = await chOneService().query({ query: GetPersonaByIdQuery, variables: { id: personaId } });

    if (error) {
      console.log(error);
      return undefined;
    }

    const results = data?.persona as IPersona;

    return results;
  };

  const GetPersonas = async () => {
    const { error, data } = await chOneService().query({
      query: GetPersonasQuery,
    });

    if (error) {
      console.log(error);

      return undefined;
    }

    const results = data?.allPersona as IResult<IPersona[]>;

    return results;
  };

  return { GetPersonaById, GetPersonas };
};
