import { IOutcome, IResult } from 'models';
import { GetOutcomeByIdQuery, GetOutcomeByThemeIdQuery } from '../GraphQL/Queries/Outcome.gql';
import { chOneService } from './CHOneService';

export const OutcomeService = () => {
  const GetOutcomeById = async (gameOutcomeId: string): Promise<IOutcome | undefined> => {
    const { error, data } = await chOneService().query({
      query: GetOutcomeByIdQuery,
      variables: { id: gameOutcomeId },
    });

    if (error) {
      console.log(error);
      return undefined;
    }

    const results = data?.gameOutcome as IOutcome;

    return results;
  };

  const GetOutcomeByTheme = async (themeId: string): Promise<IResult<IOutcome[]> | undefined> => {
    const { error, data } = await chOneService().query({
      query: GetOutcomeByThemeIdQuery,
      variables: { id: themeId },
    });

    if (error) {
      console.log(error);

      return undefined;
    }

    const results = data?.allGameOutcome as IResult<IOutcome[]>;

    return results;
  };

  return { GetOutcomeById, GetOutcomeByTheme };
};
