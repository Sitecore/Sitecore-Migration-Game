import { IPersona } from 'models';
import { GetPersonaByIdQuery } from '../GraphQL/Queries/Personas.gql';
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

  return { GetPersonaById };
};
