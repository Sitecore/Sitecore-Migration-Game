import { IImage, IResult } from 'models';

export interface IPersona {
  name: string;
  image?: string;
  id: string;
  personalTypeId: string;
  personaImage?: IResult<IImage[]>;
}
