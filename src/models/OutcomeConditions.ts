import { GameInfoContextType } from 'components/ui';
import { IAnswer } from 'models';

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
  netcore: boolean;
}

export interface ISecuredPages {
  securityloginrequired: boolean;
}

export interface ISiteSearchUsed {
  indexSearch: boolean;
}

export enum ExperienceEdgeOption {
  yes = 'yesexperienceedge',
  no = 'noexperienceedge',
  some = 'someexperienceedge',
}

export enum PromptMappings {
  platform = 'introduction',
  xpFeatures = 'xpfeatures',
  desiredFramework = 'desiredframeworks',
  securePages = 'securedpages',
  existingFramework = 'existingframeworks',
  experienceEdge = 'experienceedge',
  xcFeatures = 'xcfeatures',
  siteSearchUsed = 'sitesearch',
  historicalPersonalization = 'historicalpersonalizationneeds',
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
    this.existingFrameworks = { netcore: false };
    this.securedPages = { securityloginrequired: false };
    this.experienceEdge = ExperienceEdgeOption.no;
    this.siteSearchUsed = { indexSearch: false };

    //If a gameInfoContext was provided, initialize all data from the answers in the context
    if (gameInfoContext) {
      this.parseContext(gameInfoContext);
    }
  }

  /**
   * Analyzes current answers to determine if this is a complex personalizations cenario
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
   * Looks at selections to determine if some sort of marketing automation feature is in use
   */
  isMarketingAutomation(): boolean {
    return this.xpFeaturesUsed.forms || this.xpFeaturesUsed.exm || this.xpFeaturesUsed.marketingAutomation;
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
    //NOTE: We don't have a prompt yet to distinguish if the customer needs CDP instead/in addition
    if (this.isComplexPersonalization()) {
      products.push(TargetProduct.personalize);
    }

    //If the customer is using marketing automation functionality, they will need Send
    if (this.isMarketingAutomation()) {
      products.push(TargetProduct.send);
    }

    //If they have XC, regardless of features selected, we direct the customer to OrderCloud
    if (this.isXC) {
      products.push(TargetProduct.orderCloud);
    }

    return products;
  }

  /**
   * Reads all the data from a GameInfoContextType and fills in all the properties, based on the prompts and answers.
   * The boolean checks are most easily written/understood as answers to single prompts, so for more complex checks you should break down the question into single prompts and then combine
   * @param gameInfoContext: This is the current context which contains the prompts and answers
   */
  parseContext(gameInfoContext: GameInfoContextType) {
    //Determine if the user selected XC as the product
    this.isXC =
      gameInfoContext.answers?.find(
        (x: IAnswer) => x.promptQuestionId == PromptMappings.platform && x.value.includes('xc')
      ) != undefined;

    //If XC was selected, parse the questions for the user's answers
    if (this.isXC) {
      this.parseContext_XCFeatures(gameInfoContext);
    }

    //Determine if the user selected XP as the product
    this.isXP =
      gameInfoContext.answers?.find(
        (x: IAnswer) => x.promptQuestionId == PromptMappings.platform && x.value.includes('xp')
      ) != undefined;

    //XC contains XP, so if the user answered XC or XP, then check for XP features
    if (this.isXC || this.isXP) {
      this.parseContext_XPFeatures(gameInfoContext);

      //If after parsing we determine that historical personalization is used, check for what historical personalization they need
      if (this.xpFeaturesUsed.historicalPersonalization) {
        this.parseContext_HistoricalPersonalization(gameInfoContext);
      }
    }

    //NOTE: For now, all paths assume XM functionality is in use (XC > XP > XM). If there is a need to specifically test for XM selection, then this boolean is used.
    this.isXM =
      gameInfoContext.answers?.find(
        (x: IAnswer) => x.promptQuestionId == PromptMappings.platform && x.value.includes('xm')
      ) != undefined;

    this.parseContext_ExistingFramework(gameInfoContext);
    this.parseContext_DesiredFramework(gameInfoContext);
    this.parseContext_SecuredPages(gameInfoContext);
    this.parseContext_ExperienceEdge(gameInfoContext);
    this.parseContext_SiteSearchUsed(gameInfoContext);
  }

  /**
   * Read the XC Features information from a GameInfoContextType
   * @param gameInfoContext: This is the current context which contains the prompts and answers
   */
  parseContext_XCFeatures(gameInfoContext: GameInfoContextType) {
    var xcFeatures = gameInfoContext.answers?.find((x: IAnswer) => x.promptQuestionId == PromptMappings.xcFeatures);
    if (xcFeatures != undefined) {
      this.xcFeaturesUsed.carts = xcFeatures.value.includes('xccarts');
      this.xcFeaturesUsed.customerAccounts = xcFeatures.value.includes('xccustomeraccounts');
      this.xcFeaturesUsed.fulfillments = xcFeatures.value.includes('xcfulfillments');
      this.xcFeaturesUsed.giftCards = xcFeatures.value.includes('xcgiftcards');
      this.xcFeaturesUsed.inventory = xcFeatures.value.includes('xcinventory');
      this.xcFeaturesUsed.orders = xcFeatures.value.includes('xcorders');
      this.xcFeaturesUsed.payment = xcFeatures.value.includes('xcpayment');
      this.xcFeaturesUsed.productCatalog = xcFeatures.value.includes('xcproductcatalog');
      this.xcFeaturesUsed.promotions = xcFeatures.value.includes('xcpromotions');
      this.xcFeaturesUsed.rma = xcFeatures.value.includes('xcrma');
      this.xcFeaturesUsed.shipping = xcFeatures.value.includes('xcshipping');
    }
  }

  /**
   * Read the XP Features information from a GameInfoContextType
   * @param gameInfoContext: This is the current context which contains the prompts and answers
   */
  parseContext_XPFeatures(gameInfoContext: GameInfoContextType) {
    var xpFeatures = gameInfoContext.answers?.find((x: IAnswer) => x.promptQuestionId == PromptMappings.xpFeatures);
    if (xpFeatures != undefined) {
      this.xpFeaturesUsed.captureadditionalevents = xpFeatures.value.includes('captureadditionalevents');
      this.xpFeaturesUsed.customrules = xpFeatures.value.includes('customrules');
      this.xpFeaturesUsed.exm = xpFeatures.value.includes('exm');
      this.xpFeaturesUsed.externalDataSystems = xpFeatures.value.includes('externaldatasystems');
      this.xpFeaturesUsed.forms = xpFeatures.value.includes('forms');
      this.xpFeaturesUsed.historicalPersonalization = xpFeatures.value.includes('historicalpersonalization');
      this.xpFeaturesUsed.identityResolution = xpFeatures.value.includes('identityresolution');
      this.xpFeaturesUsed.marketingAutomation = xpFeatures.value.includes('marketingautomation');
      this.xpFeaturesUsed.patternCards = xpFeatures.value.includes('patterncards');
      this.xpFeaturesUsed.sessionPersonalization = xpFeatures.value.includes('sessionpersonalization');
      this.xpFeaturesUsed.customXDBFacets = xpFeatures.value.includes('customxdbfacets');
      this.xpFeaturesUsed.customAnalyticsDashboard = xpFeatures.value.includes('customanalyticsdashboards');
    }
  }

  /**
   * Check for what type of historical personalization data retention is required
   * @param gameInfoContext: This is the current context which contains the prompts and answers
   */
  parseContext_HistoricalPersonalization(gameInfoContext: GameInfoContextType) {
    var dataRetentionOptions = gameInfoContext.answers?.find(
      (x: IAnswer) => x.promptQuestionId == PromptMappings.historicalPersonalization
    );
    if (dataRetentionOptions != undefined) {
      this.historicalPersonalization.last30days = dataRetentionOptions.value.includes('historicalpersonalize30');
      this.historicalPersonalization.last90days = dataRetentionOptions.value.includes('historicalpersonalize90');
      this.historicalPersonalization.morethan90days = dataRetentionOptions.value.includes(
        'historicalpersonalizemorethan90'
      );
    }
  }

  /**
   * Determine which frameworks they have in their solution.
   * Only checking for the ones that have content conditions, extend as needed.
   * @param gameInfoContext: This is the current context which contains the prompts and answers
   */
  parseContext_ExistingFramework(gameInfoContext: GameInfoContextType) {
    var existingFrameworkOptions = gameInfoContext.answers?.find(
      (x: IAnswer) => x.promptQuestionId == PromptMappings.existingFramework
    );
    if (existingFrameworkOptions != undefined) {
      this.existingFrameworks.netcore = existingFrameworkOptions.value.includes('netcore');
    }
  }

  /**
   * If they are on an outdated framework, determine which frameworks they want to move to.
   * Only checking for the ones that have content conditions, extend as needed.
   * @param gameInfoContext: This is the current context which contains the prompts and answers
   */
  parseContext_DesiredFramework(gameInfoContext: GameInfoContextType) {
    var desiredFrameworkOptions = gameInfoContext.answers?.find(
      (x: IAnswer) => x.promptQuestionId == PromptMappings.desiredFramework
    );
    if (desiredFrameworkOptions != undefined) {
      this.desiredFrameworks.netcore = desiredFrameworkOptions.value.includes('netcore');
      this.desiredFrameworks.nextjs = desiredFrameworkOptions.value.includes('nextjs');
    }
  }

  /**
   * Check for what type of authentication/authorization is in the solution.
   * Only checking for the ones that have content conditions, extend as needed.
   * @param gameInfoContext: This is the current context which contains the prompts and answers
   */
  parseContext_SecuredPages(gameInfoContext: GameInfoContextType) {
    var securedPagesOptions = gameInfoContext.answers?.find(
      (x: IAnswer) => x.promptQuestionId == PromptMappings.securePages
    );
    if (securedPagesOptions != undefined) {
      this.securedPages.securityloginrequired = securedPagesOptions.value.includes('securityloginrequired');
    }
  }

  /**
   * Check if Experience Edge was implemented in the current solution.
   * Defaults to 'no'.
   * @param gameInfoContext: This is the current context which contains the prompts and answers
   */
  parseContext_ExperienceEdge(gameInfoContext: GameInfoContextType) {
    var experienceEdgeOptions = gameInfoContext.answers?.find(
      (x: IAnswer) => x.promptQuestionId == PromptMappings.experienceEdge
    );
    if (experienceEdgeOptions != undefined) {
      //Determine which value was selected. Default to 'no' if not matching to Yes or Some
      if (experienceEdgeOptions.value.includes('yesexperienceedge')) this.experienceEdge = ExperienceEdgeOption.yes;
      else if (experienceEdgeOptions.value.includes('someexperienceedge'))
        this.experienceEdge = ExperienceEdgeOption.some;
      else this.experienceEdge = ExperienceEdgeOption.no;
    }
  }

  /**
   * Check for what type of site search is in the solution.
   * Only checking for the ones that have content conditions, extend as needed.
   * @param gameInfoContext: This is the current context which contains the prompts and answers
   */
  parseContext_SiteSearchUsed(gameInfoContext: GameInfoContextType) {
    var siteSearchUsedOptions = gameInfoContext.answers?.find(
      (x: IAnswer) => x.promptQuestionId == PromptMappings.siteSearchUsed
    );
    if (siteSearchUsedOptions != undefined) {
      this.siteSearchUsed.indexSearch = siteSearchUsedOptions.value.includes('search-index');
    }
  }
}
