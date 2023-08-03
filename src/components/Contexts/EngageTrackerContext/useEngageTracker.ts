import { useContext } from 'react';
import { EngageTrackerContext } from './EngageTrackerContext';

export const useEngageTracker = () => {
  const context = useContext(EngageTrackerContext);

  const TrackPageView = async (title: string) => {
    console.log(title);
  };

  /** */
  const Identify = async (email: string) => {};

  const TrackEvent = async (eventName: string, eventValue: string) => {};

  return { context, TrackPageView, Identify, TrackEvent };
};
