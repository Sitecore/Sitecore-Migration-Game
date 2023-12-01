import { IProduct } from './IProduct';
import { TargetProduct } from './OutcomeConditions';

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

export const Products: IProduct[] = [
  {
    product: TargetProduct.cdp,
    name: 'Sitecore CDP',
    description:
      'Brings together real-time behavioral insights and all your customer data so you can understand and engage every customer (and anonymous visitors) instantly.',
    url: 'https://developers.sitecore.com/customer-data-management/cdp',
    icon: '/hexagons/cdp.svg',
    iconSmall: '/hexagons/cdp-small.svg',
    cloud: 'ENGAGEMENT',
  },
  {
    product: TargetProduct.connect,
    name: 'Sitecore Connect',
    description:
      'Is a Low-code / No-code integration platform that enables your organization to connect Sitecore with the rest of your martech stack.',
    icon: '/hexagons/connect.svg',
    iconSmall: '/hexagons/connect-small.svg',
    url: 'https://developers.sitecore.com/integrations/connect',
    cloud: 'ENGAGEMENT',
  },
  {
    product: TargetProduct.discover,
    name: 'Sitecore Discover',
    description: '',
    icon: '/hexagons/discover.svg',
    iconSmall: '/hexagons/discover-small.svg',
    url: 'https://developers.sitecore.com/commerce/discover',
    cloud: 'COMMERCE',
  },
  {
    product: TargetProduct.contentHubOps,
    name: 'Content Operations',
    description: '',
    icon: '/hexagons/contenthub-ops.svg',
    iconSmall: '/hexagons/contenthub-ops-small.svg',
    url: 'https://developers.sitecore.com/dam-and-content-operations/content-hub',
    cloud: 'CONTENT',
  },
  {
    product: TargetProduct.contentHubDAM,
    name: 'Sitecore DAM',
    description: '',
    icon: '/hexagons/ContentHubDAM.svg',
    iconSmall: '/hexagons/ContentHubDAM-small.svg',
    url: 'https://developers.sitecore.com/dam-and-content-operations/dam',
    cloud: 'CONTENT',
  },
  {
    product: TargetProduct.contentHubONE,
    name: 'Content Hub ONE',
    description: '',
    icon: '/hexagons/content-hub-one.svg',
    iconSmall: '/hexagons/content-hub-one-small.svg',
    url: 'https://developers.sitecore.com/content-management/content-hub-one',
    cloud: 'CONTENT',
  },
  {
    product: TargetProduct.orderCloud,
    name: 'Sitecore OrderCloud',
    description: 'Cloud-native, Headless, and API-first Commerce solution.',
    icon: '/hexagons/ordercloud.svg',
    iconSmall: '/hexagons/ordercloud-small.svg',
    url: 'https://developers.sitecore.com/commerce/ordercloud',
    cloud: 'COMMERCE',
  },
  {
    product: TargetProduct.personalize,
    name: 'Sitecore Personalize',
    description: 'Use advanced decisioning models and machine learning to deliver individualized experiences.',
    icon: '/hexagons/personalize.svg',
    iconSmall: '/hexagons/personalize-small.svg',
    url: 'https://developers.sitecore.com/personalization-testing/personalize',
    cloud: 'ENGAGEMENT',
  },
  {
    product: TargetProduct.search,
    name: 'Sitecore Search',
    description: 'Predict search intent and display individualized results with a personalized search experience.',
    icon: '/hexagons/search.svg',
    iconSmall: '/hexagons/search-small.svg',
    url: 'https://developers.sitecore.com/content-management/search',
    cloud: 'CONTENT',
  },
  {
    product: TargetProduct.send,
    name: 'Sitecore Send',
    description:
      'You can dive into the world of e-mail marketing and create the most responsive newsletters to amaze your subscribers.',
    url: 'https://developers.sitecore.com/marketing-automation/send',
    icon: '/hexagons/send.svg',
    iconSmall: '/hexagons/send-small.svg',
    cloud: 'ENGAGEMENT',
  },
  {
    product: TargetProduct.xmCloud,
    name: 'XM Cloud',
    description:
      "Sitecore Experience Manager Cloud (XM Cloud) is a fully managed self-service deployment platform for developers and marketers to efficiently launch engaging omnichannel experiences in the Cloud using Sitecore's headless CMS.",
    icon: '/hexagons/XMCloud.svg',
    iconSmall: '/hexagons/XMCloud-small.svg',
    url: 'https://developers.sitecore.com/content-management/xm-cloud',
    cloud: 'CONTENT',
  },
];
