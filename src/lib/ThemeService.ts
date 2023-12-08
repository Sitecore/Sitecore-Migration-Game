import { chOneService } from 'lib/CHOneService';
import { IResult, ITheme } from 'models';
import { GetAllThemesQuery, GetThemesByIdQuery } from '../GraphQL/Queries/Themes.gql';

export const ThemeService = () => {
  const GetAllThemes = async (): Promise<IResult<ITheme[]> | null> => {
    const { error, data } = await chOneService().query({ query: GetAllThemesQuery });

    if (error) {
      console.log(error);
      return null;
    }

    const results = data?.allThemes as IResult<ITheme[]>;

    return results;
  };

  const GetThemeById = async (themeId: string): Promise<ITheme | undefined> => {
    const { error, data } = await chOneService().query({ query: GetThemesByIdQuery, variables: { id: themeId } });

    if (error) {
      console.log(error);
      return undefined;
    }

    const results = data?.theme as ITheme;

    return results;
  };

  return { GetAllThemes, GetThemeById };
};
