import { GameInfoContextType } from 'components/Contexts';
import { GameContextParser } from 'lib/GameContextParser';

export interface IXCFeaturesUsed {
  carts: boolean;
  customerAccounts: boolean;
  fulfillments: boolean;
  giftCards: boolean;
  inventory: boolean;
  orders: boolean;
  payment: boolean;
  productCatalog: boolean;
  promotions: boolean;
  rma: boolean;
  shipping: boolean;
}

export interface IXPFeaturesUsed {
  captureadditionalevents: boolean;
  customrules: boolean;
  exm: boolean;
  externalDataSystems: boolean;
  forms: boolean;
  historicalPersonalization: boolean;
  identityResolution: boolean;
  marketingAutomation: boolean;
  patternCards: boolean;
  sessionPersonalization: boolean;
  customXDBFacets: boolean;
  customAnalyticsDashboard: boolean;
}

export interface IXPHistoricalPersonalization {
  last30days: boolean;
  last90days: boolean;
  morethan90days: boolean;
}

export interface IDesiredFrameworks {
  netcore: boolean;
  nextjs: boolean;
}

export interface IExistingFrameworks {
  angular: boolean;
  mvc: boolean;
  netcore: boolean;
  nextjs: boolean;
  react: boolean;
  sxa: boolean;
  vue: boolean;
  webforms: boolean;
  xslt: boolean;
}

export interface ISecuredPages {
  securityloginrequired: boolean;
}

export interface ISiteSearchUsed {
  indexSearch: boolean;
}

export interface ISerializationUsed {
  unicorn: boolean;
  tds: boolean;
  scs: boolean;
  none: boolean;
}

export interface IConnectorsUsed {
  none: boolean,
  sfmc: boolean,
  sfcrm: boolean,
  contenthub: boolean,
  dam: boolean,
  cmp: boolean,
  dynamics365commerce: boolean,
  dynamics365sales: boolean,
  komfo: boolean,
  sharepoint: boolean,
  customDEF: boolean,
}

export enum ExperienceEdgeOption {
  yes = 'yesexperienceedge',
  no = 'noexperienceedge',
  some = 'someexperienceedge',
}

export enum TargetProduct {
  cdp = 'CDP',
  connect = 'Connect',
  discover = 'Discover',
  contentHubOps = 'Content Hub Ops',
  contentHubDAM = 'Content Hub DAM',
  contentHubONE = 'Content Hub ONE',
  orderCloud = 'OrderCloud',
  personalize = 'Personalize',
  search = 'Search',
  send = 'Send',
  xmCloud = 'XM Cloud',
}

export class OutcomeConditions {
  isXC: boolean;
  isXP: boolean;
  isXM: boolean;
  xcFeaturesUsed: IXCFeaturesUsed;
  xpFeaturesUsed: IXPFeaturesUsed;
  historicalPersonalization: IXPHistoricalPersonalization;
  desiredFrameworks: IDesiredFrameworks;
  existingFrameworks: IExistingFrameworks;
  securedPages: ISecuredPages;
  experienceEdge: ExperienceEdgeOption;
  siteSearchUsed: ISiteSearchUsed;
  serializationUsed: ISerializationUsed;
  connectorsUsed: IConnectorsUsed;

  /**
   * Creates a new instance of OutcomeConditions.
   * Defaults all properties, with XM as the assumed product.
   * @param gameInfoContext: Optional parameter. Can be used to pass in answers to populate properties.
   */
  constructor(gameInfoContext?: GameInfoContextType) {
    //In case of no context, default to XM with all features not selected.
    this.isXC = false;
    this.isXP = false;
    this.isXM = true;
    this.xcFeaturesUsed = {
      carts: false,
      customerAccounts: false,
      fulfillments: false,
      giftCards: false,
      inventory: false,
      orders: false,
      payment: false,
      productCatalog: false,
      promotions: false,
      rma: false,
      shipping: false,
    };
    this.xpFeaturesUsed = {
      captureadditionalevents: false,
      customrules: false,
      exm: false,
      externalDataSystems: false,
      forms: false,
      historicalPersonalization: false,
      identityResolution: false,
      marketingAutomation: false,
      patternCards: false,
      sessionPersonalization: false,
      customXDBFacets: false,
      customAnalyticsDashboard: false,
    };
    this.historicalPersonalization = {
      last30days: true,
      last90days: false,
      morethan90days: false,
    };
    this.desiredFrameworks = { netcore: false, nextjs: false };
    this.existingFrameworks = {
      angular: false,
      mvc: false,
      netcore: false,
      nextjs: false,
      react: false,
      sxa: false,
      vue: false,
      webforms: false,
      xslt: false,
    };
    this.securedPages = { securityloginrequired: false };
    this.experienceEdge = ExperienceEdgeOption.no;
    this.siteSearchUsed = { indexSearch: false };
    this.serializationUsed = { tds: false, unicorn: false, scs: false, none: false };
    this.connectorsUsed = {
      none: true,
      sfmc: false,
      sfcrm: false,
      contenthub: false,
      dam: false,
      cmp: false,
      dynamics365commerce: false,
      dynamics365sales: false,
      komfo: false,
      sharepoint: false,
      customDEF: false
    };

    //If a gameInfoContext was provided, initialize all data from the answers in the context
    if (gameInfoContext) {
      const parser = new GameContextParser();
      parser.parseContext(gameInfoContext, this);
    }
  }

  /**
   * Checks current answers to determine if the selections mean that Sitecore CDP would be needed
   * @returns True if the selections made mean that XP is being used like Sitecore CDP
   */
  isCDP(): boolean {
    return this.xpFeaturesUsed.customXDBFacets || this.xpFeaturesUsed.customAnalyticsDashboard;
  }

  /**
   * Analyzes current answers to determine if this is a complex personalization scenario
   * that would require Sitecore Personalize or CDP
   */
  isComplexPersonalization(): boolean {
    return (
      (this.xpFeaturesUsed.historicalPersonalization && this.historicalPersonalization.last90days) ||
      this.xpFeaturesUsed.customrules ||
      this.xpFeaturesUsed.captureadditionalevents ||
      this.xpFeaturesUsed.externalDataSystems ||
      this.xpFeaturesUsed.identityResolution ||
      this.xpFeaturesUsed.patternCards
    );
  }

  /**
   * Checks current frameworks to ensure that there are no non-Headless frameworks selected.
   * If even a single non-Headless framework is selected, there is front-end migration work
   * required (such as MVC to Next.js)
   */
  isFullyHeadless(): boolean {
    return (
      !this.existingFrameworks.mvc &&
      !this.existingFrameworks.sxa &&
      !this.existingFrameworks.webforms &&
      !this.existingFrameworks.xslt
    );
  }

  /**
   * Looks at selections to determine if some sort of marketing automation feature is in use
   */
  isMarketingAutomation(): boolean {
    return this.xpFeaturesUsed.exm || this.xpFeaturesUsed.marketingAutomation;
  }

  /**
   * Analyzes current answers to determine if this is a 'simple' personalization solution that
   * can be supported by XM Cloud alone and does not need other products.
   * XM Cloud can support session personalization or historical personalization up to 30 days.
   * Any complex personalization or XP features requiring another product (like Send) do not qualify.
   */
  isSimplePersonalization(): boolean {
    return (
      (this.xpFeaturesUsed.sessionPersonalization ||
        (this.xpFeaturesUsed.historicalPersonalization && this.historicalPersonalization.last30days)) &&
      !(this.isComplexPersonalization() || this.xpFeaturesUsed.exm || this.xpFeaturesUsed.marketingAutomation)
    );
  }

  /**
   * Analyzes current answers to determine if the solution has some form of external system integration that could be moved to Connect.
   * Any use of Data Exchange Framework or Sitecore external integration module also qualifies for migration
   * Not required for some connectors which are included in other products (such as DAM integration)
   */
  requiresConnect(): boolean {
    return (
      this.xpFeaturesUsed.externalDataSystems ||
      this.connectorsUsed.customDEF ||
      this.connectorsUsed.dynamics365commerce ||
      this.connectorsUsed.dynamics365sales ||
      this.connectorsUsed.komfo ||
      this.connectorsUsed.sfcrm ||
      this.connectorsUsed.sfmc
    );
  }

  /**
   * Returns a list of products that can be migrated to.
   * NOTE: Several product options don't have Prompts yet that can help lead to a result, so are not included.
   * @returns
   */
  requiredProducts(): TargetProduct[] {
    //Instantiate return list
    let products: TargetProduct[];
    products = [];

    //Right now, all paths suggest XM Cloud + Search. There are no prompts or articles yet for directing users to another content or search product.
    products.push(TargetProduct.xmCloud);

    //If the customer has a custom index search, they need to transition to Sitecore Search. All other options they can keep as is.
    if (this.siteSearchUsed.indexSearch) {
      products.push(TargetProduct.search);
    }

    //If the customer is using more functionality than what is supported by XM Cloud, they will need Personalize.
    if (this.isComplexPersonalization()) {
      products.push(TargetProduct.personalize);
    }

    //If the customer is using advanced XP features not supported by Personalize, then we need CDP
    if (this.isCDP()) {
      products.push(TargetProduct.cdp);
    }

    //If the customer is using marketing automation functionality, they will need Send
    if (this.isMarketingAutomation()) {
      products.push(TargetProduct.send);
    }

    //If they have XC, regardless of features selected, we direct the customer to OrderCloud
    if (this.isXC) {
      products.push(TargetProduct.orderCloud);
    }

    //If they are using some form of integration, we direct towards migrating to Sitecore Connect
    if (this.requiresConnect()) {
      products.push(TargetProduct.connect);
    }

    return products;
  }
}
