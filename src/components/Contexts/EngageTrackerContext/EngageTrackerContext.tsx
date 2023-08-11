import { Engage, init } from '@sitecore/engage';
import { Loading } from 'components/ui';
import { FC, createContext, useCallback, useEffect, useState } from 'react';

export const EngageTrackerContext = createContext<EngageTrackerContextType>({} as EngageTrackerContextType);

export interface EngageTrackerContextType {
  engageTracker: Engage | undefined;
}

interface EngageTrackerProviderProps {
  children: React.ReactNode;
}

export const EngageTrackerProvider: FC<EngageTrackerProviderProps> = ({ children }) => {
  const [engageTracker, setEngageTracker] = useState<Engage | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  const loadEngageTracker = useCallback(async () => {
    setLoading(true);
    const tracker: Engage = await init({
      clientKey: process.env.SITECORE_CDP_CLIENT_KEY || '',
      targetURL: process.env.SITECORE_CDP_TARGET_URL || '',
      cookieDomain: process.env.SITECORE_CDP_COOKIE_DOMAIN || '',
      pointOfSale: process.env.SITECORE_CDP_POS || '',
      cookieExpiryDays: 365,
      forceServerCookieMode: false,
    });

    setEngageTracker(tracker);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadEngageTracker();
  }, [loadEngageTracker]);

  return (
    <>
      {loading ? (
        <Loading message="Loading" />
      ) : (
        <>
          <EngageTrackerContext.Provider value={{ engageTracker: engageTracker }}>
            {children}
          </EngageTrackerContext.Provider>
        </>
      )}
    </>
  );
};
