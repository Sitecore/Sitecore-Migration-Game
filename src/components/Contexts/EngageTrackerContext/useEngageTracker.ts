import { ICustomEventInput, IPageViewEventInput } from '@sitecore/engage';
import { INestedObject } from '@sitecore/engage/types/lib/utils/flatten-object';
import { useContext } from 'react';
import { EngageTrackerContext } from './EngageTrackerContext';

export const useEngageTracker = () => {
  const context = useContext(EngageTrackerContext);

  const TrackPageView = async (pageViewData: IPageViewEventInput, extensionData?: INestedObject | undefined) => {
    console.log({ pageViewData, extensionData });

    console.log(context);
    await context.engageTracker?.pageView(pageViewData, extensionData);
  };

  const Identify = async (email: string) => {
    console.log({ email });
  };

  const TrackEvent = async (eventName: string, extensionData?: INestedObject | undefined) => {
    console.log({ eventName, extensionData });

    const eventData: ICustomEventInput = {
      channel: 'WEB',
      currency: 'USD',
      pointOfSale: process.env.SITECORE_CDP_POS || '',
      language: 'EN',
    };

    await context.engageTracker?.event(eventName, eventData, extensionData);
  };

  return { context, TrackPageView, Identify, TrackEvent };
};
