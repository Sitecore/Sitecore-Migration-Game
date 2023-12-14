import { Engage, init } from '@sitecore/engage';
import { Loading } from 'components/ui';
import { AppConfig } from 'models/Config';
import { FC, createContext, useCallback, useEffect, useRef, useState } from 'react';

export const EngageTrackerContext = createContext<EngageTrackerContextType>({} as EngageTrackerContextType);

export interface EngageTrackerContextType {
  engageTracker: Engage | undefined;
  isTrackerEnabled: boolean;
}

interface EngageTrackerProviderProps {
  children: React.ReactNode;
}

export const EngageTrackerProvider: FC<EngageTrackerProviderProps> = ({ children }) => {
  const [engageTracker, setEngageTracker] = useState<Engage | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const isTrackerEnabled = useRef<boolean>(true);

  const loadEngageTracker = useCallback(async () => {
    setLoading(true);

    if (
      !AppConfig.SitecoreCdpClientKey ||
      !AppConfig.SitecoreCdpCookieDomain ||
      !AppConfig.SitecoreCdpPos ||
      !AppConfig.SitecoreCdpTargetUrl
    ) {
      isTrackerEnabled.current = false;
      console.log('SitecoreCdpClientKey', AppConfig.SitecoreCdpClientKey);
      console.log('SitecoreCdpCookieDomain', AppConfig.SitecoreCdpCookieDomain);
      console.log('SitecoreCdpPos', AppConfig.SitecoreCdpPos);
      console.log('SitecoreCdpTargetUrl', AppConfig.SitecoreCdpTargetUrl);
      console.log('Engage Tracker not configured correctly');
    }

    if (isTrackerEnabled.current) {
      const tracker: Engage = await init({
        clientKey: AppConfig.SitecoreCdpClientKey!,
        targetURL: AppConfig.SitecoreCdpTargetUrl!,
        cookieDomain: AppConfig.SitecoreCdpCookieDomain!,
        pointOfSale: AppConfig.SitecoreCdpPos!,
        cookieExpiryDays: 365,
        forceServerCookieMode: false,
      });

      setEngageTracker(tracker);
    }

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
          <EngageTrackerContext.Provider value={{ engageTracker, isTrackerEnabled: isTrackerEnabled.current }}>
            {children}
          </EngageTrackerContext.Provider>
        </>
      )}
    </>
  );
};
