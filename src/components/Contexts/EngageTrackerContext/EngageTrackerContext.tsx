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

    if (!AppConfig.SitecoreCdpClientKey || !AppConfig.SitecoreCdpPos || !AppConfig.SitecoreCdpTargetUrl) {
      isTrackerEnabled.current = false;
      console.log('Engage Tracker not configured correctly');
    }

    if (isTrackerEnabled.current) {
      const initConfig: any = {
        clientKey: AppConfig.SitecoreCdpClientKey,
        targetURL: AppConfig.SitecoreCdpTargetUrl,
        pointOfSale: AppConfig.SitecoreCdpPos,
        cookieExpiryDays: 365,
        forceServerCookieMode: false,
        webPersonalization: false,
      };

      if (AppConfig.SitecoreCdpCookieDomain) {
        initConfig.cookieDomain = AppConfig.SitecoreCdpCookieDomain;
      }

      const tracker: Engage = await init(initConfig);

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
