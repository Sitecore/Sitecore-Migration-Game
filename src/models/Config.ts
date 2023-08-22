import { IProduct } from './IProduct';
import { TargetProduct } from './OutcomeConditions';

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

export const Products: IProduct[] = [
  {
    product: TargetProduct.cdp,
    name: 'Sitecore CDP',
    description:
      'Brings together real-time behavioral insights and all your customer data so you can understand and engage every customer (and anonymous visitors) instantly.',
    url: 'https://developers.sitecore.com/customer-data-management/cdp',
    icon: '26469b42c25e4d7f91ef05c811bd601b',
    cloud: 'ENGAGEMENT',
  },
  {
    product: TargetProduct.connect,
    name: 'Sitecore Connect',
    description:
      'Is a Low-code / No-code integration platform that enables your organization to connect Sitecore with the rest of your martech stack.',
    icon: '8ab39b3190204ee796622d8934d19f8b',
    url: 'https://developers.sitecore.com/integrations/connect',
    cloud: 'ENGAGEMENT',
  },
  {
    product: TargetProduct.discover,
    name: 'Sitecore Discover',
    description: '',
    icon: '321e52cb1a654d6cbb4b741a36506548',
    url: 'https://developers.sitecore.com/commerce/discover',
    cloud: 'COMMERCE',
  },
  {
    product: TargetProduct.contentHubOps,
    name: 'Content Operations',
    description: '',
    icon: 'd23e3e8b102746ed8b0a60758e2bd58c',
    url: 'https://developers.sitecore.com/dam-and-content-operations/content-hub',
    cloud: 'CONTENT',
  },
  {
    product: TargetProduct.contentHubDAM,
    name: 'Sitecore DAM',
    description: '',
    icon: 'd4460059f7f74238bb65b760a8fa6859',
    url: 'https://developers.sitecore.com/dam-and-content-operations/dam',
    cloud: 'CONTENT',
  },
  {
    product: TargetProduct.contentHubONE,
    name: 'Content Hub ONE',
    description: '',
    icon: '7304d4a7dea04a5db702aaa8ca888117',
    url: 'https://developers.sitecore.com/content-management/content-hub-one',
    cloud: 'CONTENT',
  },
  {
    product: TargetProduct.orderCloud,
    name: 'Sitecore OrderCloud',
    description: 'Cloud-native, Headless, and API-first Commerce solution.',
    icon: '3eb03031027e456eb212d7c3ddf1295a',
    url: 'https://developers.sitecore.com/commerce/ordercloud',
    cloud: 'COMMERCE',
  },
  {
    product: TargetProduct.personalize,
    name: 'Sitecore Personalize',
    description: 'Use advanced decisioning models and machine learning to deliver individualized experiences.',
    icon: 'e7010cd758d049f6ad9577e2824d5bea',
    url: 'https://developers.sitecore.com/personalization-testing/personalize',
    cloud: 'ENGAGEMENT',
  },
  {
    product: TargetProduct.search,
    name: 'Sitecore Search',
    description: 'Predict search intent and display individualized results with a personalized search experience.',
    icon: '7e75e5619d514d3893c4079d291e4776',
    url: 'https://developers.sitecore.com/content-management/search',
    cloud: 'CONTENT',
  },
  {
    product: TargetProduct.send,
    name: 'Sitecore Send',
    description:
      'You can dive into the world of e-mail marketing and create the most responsive newsletters to amaze your subscribers.',
    url: 'https://developers.sitecore.com/marketing-automation/send',
    icon: 'e021e8eba3cd42d295458bb7fb064d77',
    cloud: 'ENGAGEMENT',
  },
  {
    product: TargetProduct.xmCloud,
    name: 'XM Cloud',
    description:
      "Sitecore Experience Manager Cloud (XM Cloud) is a fully managed self-service deployment platform for developers and marketers to efficiently launch engaging omnichannel experiences in the Cloud using Sitecore's headless CMS.",
    icon: '0f7f9565544a42c19371f215bd57cc0d',
    url: 'https://developers.sitecore.com/content-management/xm-cloud',
    cloud: 'CONTENT',
  },
];
