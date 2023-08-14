interface IAppConfig {
  SitecoreCdpClientKey?: string | undefined;
  SitecoreCdpPos?: string | undefined;
  SitecoreCdpCookieDomain?: string | undefined;
  SitecoreCdpTargetUrl?: string | undefined;
  SitecoreChOneClientKey: string | undefined;
  SitecoreChOneEndpointUrl: string | undefined;
}

export const AppConfig: IAppConfig = {
  SitecoreCdpClientKey: process.env.SITECORE_CDP_CLIENT_KEY || '',
  SitecoreCdpPos: process.env.SITECORE_CDP_POS || '',
  SitecoreCdpCookieDomain: process.env.SITECORE_CDP_COOKIE_DOMAIN || '',
  SitecoreCdpTargetUrl: process.env.SITECORE_CDP_TARGET_URL || '',
  SitecoreChOneClientKey: process.env.SITECORE_CH1_CLIENT_KEY || '',
  SitecoreChOneEndpointUrl: process.env.SITECORE_CH1_ENDPOINT_URL || '',
};
