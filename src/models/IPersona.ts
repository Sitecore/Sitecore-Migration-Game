import { IImage, IResult, ITheme } from 'models';

export interface IPersona {
  name: string;
  id: string;
  theme: IResult<ITheme[]>;
  personaImage?: IResult<IImage[]>;
}
