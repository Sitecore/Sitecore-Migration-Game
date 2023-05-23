import { JSONContent } from '@tiptap/core';
import { IPrompt, IResult } from 'models';

export interface IOutcome {
  id: string;
  name: string;
  text: JSONContent;
  sortOrder: number;
  promptOptionsFilter: IResult<IPrompt[]>;
}
