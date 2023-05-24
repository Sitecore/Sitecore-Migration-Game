import { IOutcome, IResult } from 'models';
import { chOneService } from './CHOneService';
import { GetOutcomeByAnswersQuery } from '../GraphQL/Queries/Outcome.gql';

export const OutcomeService = () => {
  const GetOutcomeByOptionFilter = async (answers: string[]) => {
    // Add default option to answers array
    answers.push('OaQrNE9ZZ0aqnmxmHd_nrw');

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

  return { GetOutcomeByOptionFilter };
};
