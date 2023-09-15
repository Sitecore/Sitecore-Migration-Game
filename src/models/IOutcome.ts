import { JSONContent } from '@tiptap/core';
import { IOutcomeReason, IResult, ITheme } from 'models';

export interface IOutcome {
  id: string;
  name: string;
  title: string;
  productsIntro: JSONContent;
  outcomeReasons: IResult<IOutcomeReason[]>;
  videoTitle: string;
  videoIntro: JSONContent;
  videoid: string;
  guidesIntro: JSONContent;
  xcFeaturesTitle: string;
  xcFeaturesIntro: JSONContent;
  xpFeaturesTitle: string;
  xpFeaturesIntro: JSONContent;
  xmFeaturesTitle: string;
  xmFeaturesIntro: JSONContent;
  aspnetHeadlessTitle: string;
  aspnetHeadlessIntro: JSONContent;
  themes: IResult<ITheme[]>;
}
