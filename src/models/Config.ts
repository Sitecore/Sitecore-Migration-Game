interface IAppConfig {
  SitecoreCdpClientKey?: string;
  SitecoreCdpPos?: string;
  SitecoreCdpCookieDomain?: string;
  SitecoreCdpTargetUrl?: string;
  SitecoreChOneClientKey: string;
  SitecoreChOneEndpointUrl: string;
  GaMeasurementId: string;
}

export const AppConfig: IAppConfig = {
  SitecoreCdpClientKey: process.env.SITECORE_CDP_CLIENT_KEY || '',
  SitecoreCdpPos: process.env.SITECORE_CDP_POS || '',
  SitecoreCdpCookieDomain: process.env.SITECORE_CDP_COOKIE_DOMAIN || '',
  SitecoreCdpTargetUrl: process.env.SITECORE_CDP_TARGET_URL || '',
  SitecoreChOneClientKey: process.env.SITECORE_CH1_CLIENT_KEY || '',
  SitecoreChOneEndpointUrl: process.env.SITECORE_CH1_ENDPOINT_URL || '',
  GaMeasurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID || '',
};
