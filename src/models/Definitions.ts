export interface IDefinition {
  title: string;
  description?: string;
  prompts: IPrompt[];
  responses: IResponse[];
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
  title: string;
  id: string;
  image?: string;
}

export interface IPrompt {
  text: string;
  id: string;
  options?: IOption[];
  optionType: 'buttons' | 'multiselect' | 'result';
  promptIds?: string[]; // If prompt requires additional prompts, this is the list of prompt ids
  start?: boolean; // If true, this is the first prompt
  themeId: string;
}

export interface IResponse {
  path: string;
  id: string;
}

export interface IOption {
  text: string;
  value: string;
  promptIds?: string; // Required for Buttons, but not for MultiSelect, but used to fill additional prompts
}

export interface IAnswer {
  promptId: string;
  value: string;
}
