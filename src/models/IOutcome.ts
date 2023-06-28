import { JSONContent } from '@tiptap/core';
import { IResult, ITheme } from 'models';

export interface IOutcome {
  id: string;
  name: string;
  title: string;
  productsIntro: JSONContent;
  videoTitle: string;
  videoIntro: JSONContent;
  videoId: string;
  guidesIntro: JSONContent;
  themes: IResult<ITheme[]>;
}
