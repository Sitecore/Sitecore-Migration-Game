import { GameInfoContextType } from 'components/ui';
import { IAnswer, PromptMappings } from 'models';
import { ExperienceEdgeOption, OutcomeConditions } from 'models/OutcomeConditions';

export class GameContextParser {
  /**
   * Reads all the data from a GameInfoContextType and fills in all the properties onto the outcome conditions, based on the prompts and answers.
   * @param gameInfoContext: This is the current context which contains the prompts and answers
   * @param outcomeConditions: This is where the results should be stored
   */
  parseContext(gameInfoContext: GameInfoContextType, outcomeConditions: OutcomeConditions) {
    //Determine if the user selected XC as the product
    outcomeConditions.isXC =
      gameInfoContext.answers?.find(
        (x: IAnswer) => x.promptQuestionId == PromptMappings.platform && x.value.includes('xc')
      ) != undefined;

    //If XC was selected, parse the XC questions for the user's answers
    if (outcomeConditions.isXC) {
      this.parseContext_XCFeatures(gameInfoContext, outcomeConditions);
    }

    //Determine if the user selected XP as the product
    outcomeConditions.isXP =
      gameInfoContext.answers?.find(
        (x: IAnswer) => x.promptQuestionId == PromptMappings.platform && x.value.includes('xp')
      ) != undefined;

    //XC contains XP, so if the user answered XC or XP, then check for XP features
    if (outcomeConditions.isXC || outcomeConditions.isXP) {
      this.parseContext_XPFeatures(gameInfoContext, outcomeConditions);

      //If after parsing we determine that historical personalization is used, check for what historical personalization they need
      if (outcomeConditions.xpFeaturesUsed.historicalPersonalization) {
        this.parseContext_HistoricalPersonalization(gameInfoContext, outcomeConditions);
      }
    }

    //NOTE: For now, all paths assume XM functionality is in use (XC > XP > XM). If there is a need to specifically test that the user selected XM, then this boolean is used.
    outcomeConditions.isXM =
      gameInfoContext.answers?.find(
        (x: IAnswer) => x.promptQuestionId == PromptMappings.platform && x.value.includes('xm')
      ) != undefined;

    this.parseContext_ExistingFramework(gameInfoContext, outcomeConditions);
    this.parseContext_DesiredFramework(gameInfoContext, outcomeConditions);
    this.parseContext_SecuredPages(gameInfoContext, outcomeConditions);
    this.parseContext_ExperienceEdge(gameInfoContext, outcomeConditions);
    this.parseContext_SiteSearchUsed(gameInfoContext, outcomeConditions);
  }

  /**
   * Read the XC Features information from a GameInfoContextType
   * @param gameInfoContext: This is the current context which contains the prompts and answers
   * @param outcomeConditions: This is where the results should be stored
   */
  parseContext_XCFeatures(gameInfoContext: GameInfoContextType, outcomeConditions: OutcomeConditions) {
    var xcFeatures = gameInfoContext.answers?.find((x: IAnswer) => x.promptQuestionId == PromptMappings.xcFeatures);
    if (xcFeatures != undefined) {
      outcomeConditions.xcFeaturesUsed.carts = xcFeatures.value.includes('xccarts');
      outcomeConditions.xcFeaturesUsed.customerAccounts = xcFeatures.value.includes('xccustomeraccounts');
      outcomeConditions.xcFeaturesUsed.fulfillments = xcFeatures.value.includes('xcfulfillments');
      outcomeConditions.xcFeaturesUsed.giftCards = xcFeatures.value.includes('xcgiftcards');
      outcomeConditions.xcFeaturesUsed.inventory = xcFeatures.value.includes('xcinventory');
      outcomeConditions.xcFeaturesUsed.orders = xcFeatures.value.includes('xcorders');
      outcomeConditions.xcFeaturesUsed.payment = xcFeatures.value.includes('xcpayment');
      outcomeConditions.xcFeaturesUsed.productCatalog = xcFeatures.value.includes('xcproductcatalog');
      outcomeConditions.xcFeaturesUsed.promotions = xcFeatures.value.includes('xcpromotions');
      outcomeConditions.xcFeaturesUsed.rma = xcFeatures.value.includes('xcrma');
      outcomeConditions.xcFeaturesUsed.shipping = xcFeatures.value.includes('xcshipping');
    }
  }

  /**
   * Read the XP Features information from a GameInfoContextType
   * @param gameInfoContext: This is the current context which contains the prompts and answers
   * @param outcomeConditions: This is where the results should be stored
   */
  parseContext_XPFeatures(gameInfoContext: GameInfoContextType, outcomeConditions: OutcomeConditions) {
    var xpFeatures = gameInfoContext.answers?.find((x: IAnswer) => x.promptQuestionId == PromptMappings.xpFeatures);
    if (xpFeatures != undefined) {
      outcomeConditions.xpFeaturesUsed.captureadditionalevents = xpFeatures.value.includes('captureadditionalevents');
      outcomeConditions.xpFeaturesUsed.customrules = xpFeatures.value.includes('customrules');
      outcomeConditions.xpFeaturesUsed.exm = xpFeatures.value.includes('exm');
      outcomeConditions.xpFeaturesUsed.externalDataSystems = xpFeatures.value.includes('externaldatasystems');
      outcomeConditions.xpFeaturesUsed.forms = xpFeatures.value.includes('forms');
      outcomeConditions.xpFeaturesUsed.historicalPersonalization =
        xpFeatures.value.includes('historicalpersonalization');
      outcomeConditions.xpFeaturesUsed.identityResolution = xpFeatures.value.includes('identityresolution');
      outcomeConditions.xpFeaturesUsed.marketingAutomation = xpFeatures.value.includes('marketingautomation');
      outcomeConditions.xpFeaturesUsed.patternCards = xpFeatures.value.includes('patterncards');
      outcomeConditions.xpFeaturesUsed.sessionPersonalization = xpFeatures.value.includes('sessionpersonalization');
      outcomeConditions.xpFeaturesUsed.customXDBFacets = xpFeatures.value.includes('customxdbfacets');
      outcomeConditions.xpFeaturesUsed.customAnalyticsDashboard =
        xpFeatures.value.includes('customanalyticsdashboards');
    }
  }

  /**
   * Check for what type of historical personalization data retention is required
   * @param gameInfoContext: This is the current context which contains the prompts and answers
   * @param outcomeConditions: This is where the results should be stored
   */
  parseContext_HistoricalPersonalization(gameInfoContext: GameInfoContextType, outcomeConditions: OutcomeConditions) {
    var dataRetentionOptions = gameInfoContext.answers?.find(
      (x: IAnswer) => x.promptQuestionId == PromptMappings.historicalPersonalization
    );
    if (dataRetentionOptions != undefined) {
      outcomeConditions.historicalPersonalization.last30days =
        dataRetentionOptions.value.includes('historicalpersonalize30');
      outcomeConditions.historicalPersonalization.last90days =
        dataRetentionOptions.value.includes('historicalpersonalize90');
      outcomeConditions.historicalPersonalization.morethan90days = dataRetentionOptions.value.includes(
        'historicalpersonalizemorethan90'
      );
    }
  }

  /**
   * Determine which frameworks they have in their solution.
   * Only checking for the ones that have content conditions, extend as needed.
   * @param gameInfoContext: This is the current context which contains the prompts and answers
   * @param outcomeConditions: This is where the results should be stored
   */
  parseContext_ExistingFramework(gameInfoContext: GameInfoContextType, outcomeConditions: OutcomeConditions) {
    var existingFrameworkOptions = gameInfoContext.answers?.find(
      (x: IAnswer) => x.promptQuestionId == PromptMappings.existingFramework
    );
    if (existingFrameworkOptions != undefined) {
      outcomeConditions.existingFrameworks.netcore = existingFrameworkOptions.value.includes('netcore');
    }
  }

  /**
   * If they are on an outdated framework, determine which frameworks they want to move to.
   * Only checking for the ones that have content conditions, extend as needed.
   * @param gameInfoContext: This is the current context which contains the prompts and answers
   * @param outcomeConditions: This is where the results should be stored
   */
  parseContext_DesiredFramework(gameInfoContext: GameInfoContextType, outcomeConditions: OutcomeConditions) {
    var desiredFrameworkOptions = gameInfoContext.answers?.find(
      (x: IAnswer) => x.promptQuestionId == PromptMappings.desiredFramework
    );
    if (desiredFrameworkOptions != undefined) {
      outcomeConditions.desiredFrameworks.netcore = desiredFrameworkOptions.value.includes('netcore');
      outcomeConditions.desiredFrameworks.nextjs = desiredFrameworkOptions.value.includes('nextjs');
    }
  }

  /**
   * Check for what type of authentication/authorization is in the solution.
   * Only checking for the ones that have content conditions, extend as needed.
   * @param gameInfoContext: This is the current context which contains the prompts and answers
   * @param outcomeConditions: This is where the results should be stored
   */
  parseContext_SecuredPages(gameInfoContext: GameInfoContextType, outcomeConditions: OutcomeConditions) {
    var securedPagesOptions = gameInfoContext.answers?.find(
      (x: IAnswer) => x.promptQuestionId == PromptMappings.securePages
    );
    if (securedPagesOptions != undefined) {
      outcomeConditions.securedPages.securityloginrequired =
        securedPagesOptions.value.includes('securityloginrequired');
    }
  }

  /**
   * Check if Experience Edge was implemented in the current solution.
   * Defaults to 'no'.
   * @param gameInfoContext: This is the current context which contains the prompts and answers
   * @param outcomeConditions: This is where the results should be stored
   */
  parseContext_ExperienceEdge(gameInfoContext: GameInfoContextType, outcomeConditions: OutcomeConditions) {
    var experienceEdgeOptions = gameInfoContext.answers?.find(
      (x: IAnswer) => x.promptQuestionId == PromptMappings.experienceEdge
    );
    if (experienceEdgeOptions != undefined) {
      //Determine which value was selected. Default to 'no' if not matching to Yes or Some
      if (experienceEdgeOptions.value.includes('yesexperienceedge'))
        outcomeConditions.experienceEdge = ExperienceEdgeOption.yes;
      else if (experienceEdgeOptions.value.includes('someexperienceedge'))
        outcomeConditions.experienceEdge = ExperienceEdgeOption.some;
      else outcomeConditions.experienceEdge = ExperienceEdgeOption.no;
    }
  }

  /**
   * Check for what type of site search is in the solution.
   * Only checking for the ones that have content conditions, extend as needed.
   * @param gameInfoContext: This is the current context which contains the prompts and answers
   * @param outcomeConditions: This is where the results should be stored
   */
  parseContext_SiteSearchUsed(gameInfoContext: GameInfoContextType, outcomeConditions: OutcomeConditions) {
    var siteSearchUsedOptions = gameInfoContext.answers?.find(
      (x: IAnswer) => x.promptQuestionId == PromptMappings.siteSearchUsed
    );
    if (siteSearchUsedOptions != undefined) {
      outcomeConditions.siteSearchUsed.indexSearch = siteSearchUsedOptions.value.includes('search-index');
    }
  }
}
