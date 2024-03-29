import { IImage, IResult } from 'models';

export interface ITheme {
  name: string;
  description: string;
  id: string;
  image?: IResult<IImage[]>;
  avatarGallery?: IResult<IImage[]>;
  chakraTheme: string;
  startButtonText: string;
  disabled: boolean;
}
