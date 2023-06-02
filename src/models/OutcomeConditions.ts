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
}

export class OutcomeConditions {
  isXC: boolean;
  isXP: boolean;
  isXM: boolean;
  xcFeaturesUsed: IXCFeaturesUsed;
  xpFeaturesUsed: IXPFeaturesUsed;
  desiredFrameworks: IDesiredFrameworks;
  existingFrameworks: IExistingFrameworks;
  securedPages: ISecuredPages;
  experienceEdge: ExperienceEdgeOption;

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
    };
    this.desiredFrameworks = { netcore: false, nextjs: false };
    this.existingFrameworks = { netcore: false };
    this.securedPages = { securityloginrequired: false };
    this.experienceEdge = ExperienceEdgeOption.no;

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
    return false;
  }

  /**
   * Analyzes current answers to determine if this is a 'simple' personalization that
   * can be supported by XM Cloud
   */
  isSimplePersonalization(): boolean {
    return (
      this.xpFeaturesUsed.sessionPersonalization &&
      !this.xpFeaturesUsed.exm &&
      !this.xpFeaturesUsed.marketingAutomation &&
      !this.xpFeaturesUsed.historicalPersonalization &&
      !this.xpFeaturesUsed.customrules &&
      !this.xpFeaturesUsed.captureadditionalevents &&
      !this.xpFeaturesUsed.externalDataSystems &&
      !this.xpFeaturesUsed.identityResolution &&
      !this.xpFeaturesUsed.patternCards
    );
  }

  /**
   * Reads all the data from a GameInfoContextType and fills in all the properties, based on the prompts and answers.
   * The boolean checks are most easily written/understood as answers to single prompts, so for more complex checks you should break down the question into single prompts and then combine
   * @param gameInfoContext: This is the current context which contains the prompts and answers
   */
  parseContext(gameInfoContext: GameInfoContextType) {
    this.isXC =
      gameInfoContext.answers?.find(
        (x: IAnswer) => x.promptQuestionId == PromptMappings.platform && x.value.includes('xc')
      ) != undefined;

    if (this.isXC) {
      this.parseContext_XCFeatures(gameInfoContext);
    }

    //XC contains XP, so if the user answered XC, then they also have XP features
    this.isXP =
      gameInfoContext.answers?.find(
        (x: IAnswer) => x.promptQuestionId == PromptMappings.platform && x.value.includes('xp')
      ) != undefined;
    if (this.isXC || this.isXP) {
      this.parseContext_XPFeatures(gameInfoContext);
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
}
