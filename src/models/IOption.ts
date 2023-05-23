import { IPrompt, IResult } from 'models';

export interface IOption {
  id: string;
  name: string;
  value: string;
  label: string;
  nextPrompts?: IResult<IPrompt[]>;
  disabled?: boolean;
  tooltip?: string;
}
