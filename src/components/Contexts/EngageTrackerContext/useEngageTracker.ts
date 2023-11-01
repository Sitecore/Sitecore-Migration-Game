import { ICustomEventInput, IPageViewEventInput } from '@sitecore/engage';
import { INestedObject } from '@sitecore/engage/types/lib/utils/flatten-object';
import { useContext } from 'react';
import { EngageTrackerContext } from './EngageTrackerContext';

export const useEngageTracker = () => {
  const context = useContext(EngageTrackerContext);

  const TrackPageView = async (pageViewData: IPageViewEventInput, extensionData?: INestedObject | undefined) => {
    if (!context.isTrackerEnabled) {
      console.log('Tracker is not enabled');
      return;
    }

    await context.engageTracker?.pageView(pageViewData, extensionData);
  };

  const Identify = async (email: string, firstName: string, lastName: string) => {
    if (!context.isTrackerEnabled) {
      console.log('Tracker is not enabled');
      return;
    }
    
    const eventData = {
      channel: "WEB",
      currency: "USD",
      pointOfSale: process.env.SITECORE_CDP_POS || '',
      language: "EN",
      page: "outcome",
      email: email,
      lastName: lastName,
      firstName: firstName,
      identifiers: [
          {
              id: email,
              provider: "email",
          }
      ]
    };
    await context.engageTracker?.identity(eventData);
  };

  const TrackEvent = async (eventName: string, extensionData?: INestedObject | undefined) => {
    if (!context.isTrackerEnabled) {
      console.log('Tracker is not enabled');
      return;
    }

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
