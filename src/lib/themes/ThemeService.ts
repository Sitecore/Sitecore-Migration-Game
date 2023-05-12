import { IResult, ITheme } from 'models/Definitions';
import GetAllThemesQuery from './Themes.graphql';
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

  return { GetAllThemes };
};
