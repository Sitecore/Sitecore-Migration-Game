import { Engage, init } from '@sitecore/engage';
import { FC, createContext, useCallback, useEffect, useRef } from 'react';

export const EngageTrackerContext = createContext<EngageTrackerContextType>({} as EngageTrackerContextType);

export interface EngageTrackerContextType {
  engageTracker: Engage | undefined;
}

interface EngageTrackerProviderProps {
  children: React.ReactNode;
}

export const EngageTrackerProvider: FC<EngageTrackerProviderProps> = ({ children }) => {
  const engageTracker = useRef<Engage>();

  const loadEngageTracker = useCallback(async () => {
    const tracker: Engage = await init({
      clientKey: process.env.SITECORE_CDP_CLIENT_KEY || '',
      targetURL: process.env.SITECORE_CDP_TARGET_URL || '',
      cookieDomain: process.env.SITECORE_CDP_COOKIE_DOMAIN || '',
      pointOfSale: process.env.SITECORE_CDP_POS || '',
      cookieExpiryDays: 365,
      forceServerCookieMode: false,
    });

    engageTracker.current = tracker;
  }, []);

  useEffect(() => {
    loadEngageTracker();
  }, [loadEngageTracker]);

  return (
    <EngageTrackerContext.Provider value={{ engageTracker: engageTracker.current }}>
      {children}
    </EngageTrackerContext.Provider>
  );
};
