import { IResult, ITheme } from 'models/Definitions';
import { GetAllThemesQuery, GetThemeByIdQuery } from './Themes.gql';
import { chOneService } from 'lib/CHOneService';

export const ThemeService = () => {
  const GetAllThemes = async (): Promise<IResult<ITheme[]> | null> => {
    const { error, data } = await chOneService().query({ query: GetAllThemesQuery });

    if (error) {
      console.log(error);
      return null;
    }

    const results = data?.allGameTheme as IResult<ITheme[]>;

    return results;
  };

  const GetThemeById = async (themeId: string): Promise<IResult<ITheme[]> | null> => {
    const { error, data } = await chOneService().query({ query: GetThemeByIdQuery, variables: { id: themeId } });

    if (error) {
      console.log(error);
      return null;
    }

    const results = data?.allGameTheme as IResult<ITheme[]>;

    return results;
  };

  return { GetAllThemes, GetThemeById };
};
