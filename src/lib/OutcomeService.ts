import { IOutcome, IResult } from 'models';
import { GetOutcomeQuery } from '../GraphQL/Queries/Outcome.gql';
import { chOneService } from './CHOneService';

export const OutcomeService = () => {

  const GetOutcome = async () => {
    const { error, data } = await chOneService().query({
      query: GetOutcomeQuery,
    });

    if (error) {
      console.log(error);

      return undefined;
    }

    const results = data?.allOutcome as IResult<IOutcome[]>;

    return results;
  };

  return { GetOutcome };
};