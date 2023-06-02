import { IOutcome, IResult } from 'models';
import { GetOutcomeByAnswersQuery, GetOutcomeByIdQuery } from '../GraphQL/Queries/Outcome.gql';
import { chOneService } from './CHOneService';

export const OutcomeService = () => {
  const GetOutcomeByOptionFilter = async (answers: string[]) => {
    const { data, error } = await chOneService().query({
      query: GetOutcomeByAnswersQuery,
      variables: { answers: answers },
    });

    if (error) {
      console.log(error);
      return null;
    }

    const results = data?.allGameOutcome as IResult<IOutcome[]>;

    return results;
  };

  const GetOutcomeById = async (id: string): Promise<IOutcome | null> => {
    const { data, error } = await chOneService().query({
      query: GetOutcomeByIdQuery,
      variables: { id: id },
    });

    if (error) {
      console.log(error);
      return null;
    }

    const result = data?.gameOutcome as IOutcome;

    return result;
  };

  return { GetOutcomeByOptionFilter, GetOutcomeById };
};
