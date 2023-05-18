import { JSONContent } from '@tiptap/core';

export interface IDefinition {
  title: string;
  description?: string;
  prompts: IPrompt[];
}

export interface IPersona {
  title: string;
  image?: string;
  id: string;
  personalTypeId: string;
}

export interface IPersonaType {
  id: string;
  image?: string;
}

export interface ITheme {
  name: string;
  description: string;
  id: string;
  characterImage?: IResult<IImage[]>;
}

export interface IResult<T> {
  total?: number;
  results: T;
}

export interface IImage {
  fileUrl: string;
  fileName: string;
}

export interface IPrompt {
  text: string;
  bodyText?: JSONContent;
  id: string;
  name: string;
  options?: IResult<IOption[]>;
  optionType: IResult<IOptionType[]>;
  nextPrompts?: IResult<IPrompt[]>; // If prompt requires additional prompts, this is the list of prompt ids
  start?: boolean; // If true, this is the first prompt
  theme: IResult<ITheme[]>;
  persona: IResult<IPersona[]>;
  disabled: boolean;
}

export interface IOptionType {
  id: string;
  name: string;
}

export interface IOption {
  id: string;
  name: string;
  value: string;
  label: string;
  nextPrompts?: IResult<IPrompt[]>;
  disabled?: boolean;
  tooltip?: string;
}

export interface IAnswer {
  promptId: string;
  prompt: String;
  value: string[]; // changing to be filled with Ids not value, likely going to remove
  valuePrettyText: string[];
}

export interface IOutcome {
  id: string;
  name: string;
  text: JSONContent;
  promptOptionsFilter: IResult<IPrompt[]>;
}
