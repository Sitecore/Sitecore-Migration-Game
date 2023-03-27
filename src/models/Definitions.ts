export interface IDefinition {
  title: string;
  description?: string;
  prompts: IPrompt[];
  results: IResult[];
}

export interface IPrompt {
  text: string;
  id: string;
  options?: IOption[];
  optionType: string; // "buttons" or "multiselect"
  nextId?: string; // If no buttons, this is the next prompt
  start?: boolean; // If true, this is the first prompt
  clearText?: boolean; // If true, clear the text when this prompt is shown
}

export interface IResult {
  title: string;
  description?: string;
  id: string;
  text: string;
}

export interface IOption {
  text: string;
  value: string;
  targetId?: string; // Required for Buttons, but not for MultiSelect
}
