import { JSONContent } from '@tiptap/core';
import { IImage, IOption, IOptionType, IPersona, IResult, ITheme } from 'models';

export interface IPrompt {
  text: string;
  bodyText?: JSONContent;
  id: string;
  name: string;
  questionid: string;
  options?: IResult<IOption[]>;
  optionType: IResult<IOptionType[]>;
  nextPrompts?: IResult<IPrompt[]>; // If prompt requires additional prompts, this is the list of prompt ids
  start?: boolean; // If true, this is the first prompt
  background: IResult<IImage[]>;
  theme: IResult<ITheme[]>;
  persona: IResult<IPersona[]>;
  disabled: boolean;
}
