import { ConditionalResponse } from 'components/Outcomes';
import { useGameInfoContext } from 'components/ui';
import { IAnswer, PromptMappings } from 'models';
import Link from 'next/link';
import { FC } from 'react';

interface XCFeaturesUsed {
  carts: boolean;
  customerAccounts: boolean;
  fulfillments: boolean;
  giftCards: boolean;
  inventory: boolean;
  orders: boolean;
  payment: boolean;
  productCatalog: boolean;
  promotions: boolean;
  rma:boolean;
  shipping:boolean;
}

interface XPFeaturesUsed {
  exm: boolean;
  marketingAutomation: boolean;
  sessionPersonalization: boolean;
}

interface DesiredFrameworks {
  netcore: boolean;
  nextjs: boolean;
}

interface ExistingFrameworks {
  netcore: boolean;
}

interface SecuredPages {
  securityloginrequired: boolean;  
}

interface OutcomeGeneratorProps {}

export const OutcomeGenerator: FC<OutcomeGeneratorProps> = () => {
  const gameInfoContext = useGameInfoContext();

  /*Build up the boolean 'checks' that can be used for returning the correct outcomes.
    The boolean checks are most easily written/understood as answers to single prompts, so for more complex checks you should break down the question into single prompts and then combine
  */
  const isXC = gameInfoContext.answers?.find( (x: IAnswer) => x.promptQuestionId == PromptMappings.platform && x.value.includes('xc') ) != undefined;
  
  let xcFeaturesUsed: XCFeaturesUsed = {carts:false, customerAccounts:false, fulfillments:false, giftCards:false, inventory:false, orders:false, payment:false, productCatalog:false, promotions:false, rma:false, shipping:false};
  if(isXC){
    var xcFeatures = gameInfoContext.answers?.find( (x: IAnswer) => x.promptQuestionId == PromptMappings.xcFeatures );
    if(xcFeatures != undefined){
      xcFeaturesUsed.carts = xcFeatures.value.includes('xccarts');
      xcFeaturesUsed.customerAccounts = xcFeatures.value.includes('xccustomeraccounts');
      xcFeaturesUsed.fulfillments = xcFeatures.value.includes('xcfulfillments');
      xcFeaturesUsed.giftCards = xcFeatures.value.includes('xcgiftcards');
      xcFeaturesUsed.inventory = xcFeatures.value.includes('xcinventory');
      xcFeaturesUsed.orders = xcFeatures.value.includes('xcorders');
      xcFeaturesUsed.payment = xcFeatures.value.includes('xcpayment');
      xcFeaturesUsed.productCatalog = xcFeatures.value.includes('xcproductcatalog');
      xcFeaturesUsed.promotions = xcFeatures.value.includes('xcpromotions');
      xcFeaturesUsed.rma = xcFeatures.value.includes('xcrma');
      xcFeaturesUsed.shipping = xcFeatures.value.includes('xcshipping');
    }
  }

  //XC contains XP, so if the user answered XC, then they also have XP
  const isXP = isXC || gameInfoContext.answers?.find( (x: IAnswer) => x.promptQuestionId == PromptMappings.platform && x.value.includes('xp') ) != undefined;
  let xpFeaturesUsed: XPFeaturesUsed = {exm:false, marketingAutomation:false, sessionPersonalization:false};
  if(isXP){
    var xpFeatures = gameInfoContext.answers?.find( (x: IAnswer) => x.promptQuestionId == PromptMappings.xpFeatures );
    if(xpFeatures != undefined){
      xpFeaturesUsed.exm = xpFeatures.value.includes('exm');
      xpFeaturesUsed.marketingAutomation = xpFeatures.value.includes('marketingautomation');
      xpFeaturesUsed.sessionPersonalization = xpFeatures.value.includes('sessionpersonalization');
    }
  }

  //NOTE: For now, all paths assume XM functionality is in use (XC > XP > XM). If there is a need to specifically test for XM selection, then this boolean is used.
  const isXM = gameInfoContext.answers?.find( (x: IAnswer) => x.promptQuestionId == PromptMappings.platform && x.value.includes('xm') ) != undefined;

  //Determine which frameworks they have in their solution. Only checking for the ones that have content conditions, extend as needed.
  let existingFrameworks: ExistingFrameworks = {netcore:false};
  var existingFrameworkOptions = gameInfoContext.answers?.find( (x: IAnswer) => x.promptQuestionId == PromptMappings.existingFramework );
  if(existingFrameworkOptions != undefined){
    existingFrameworks.netcore = existingFrameworkOptions.value.includes("netcore");
  }

  //If they are on an outdated framework, determine which frameworks they want to move to. Only checking for the ones that have content conditions, extend as needed.
  let desiredFrameworks: DesiredFrameworks = {netcore:false,nextjs:false};
  var desiredFrameworkOptions = gameInfoContext.answers?.find( (x: IAnswer) => x.promptQuestionId == PromptMappings.desiredFramework );
  if(desiredFrameworkOptions != undefined){
    desiredFrameworks.netcore = desiredFrameworkOptions.value.includes("netcore");
    desiredFrameworks.nextjs = desiredFrameworkOptions.value.includes("nextjs");
  }

  //Check for what type of authentication/authorization is in the solution. Only loading values for those with conditions, to be extended as needed.
  let securedPages: SecuredPages = {securityloginrequired:false};
  var securedPagesOptions = gameInfoContext.answers?.find( (x: IAnswer) => x.promptQuestionId == PromptMappings.securePages );
  if(securedPagesOptions != undefined){
    securedPages.securityloginrequired = securedPagesOptions.value.includes("securityloginrequired");
  }

  //For Experience Edge, it can only have a Yes/No/Sometimes value. 
  var experienceEdgeOptions = gameInfoContext.answers?.find( (x: IAnswer) => x.promptQuestionId == PromptMappings.experienceEdge );
  let experienceEdgeYes = false;
  let experienceEdgeNo = false;
  let experienceEdgeSome = false;
  if(experienceEdgeOptions != undefined){
    experienceEdgeYes = experienceEdgeOptions.value.includes('yesexperienceedge');
    experienceEdgeNo = experienceEdgeOptions.value.includes('noexperienceedge');
    experienceEdgeSome = experienceEdgeOptions.value.includes('someexperienceedge');
  }

  return (
    <>
      Based on what has been collected, we believe the following guides will be helpful in your Quest for SaaS! Good luck on your adventure to migrating to a composable DXP stack.
      <ConditionalResponse condition={isXC}>
        <h2>Experience Commerce (XC) migration</h2>
        <p>For your XC features, you will first want to migrate this functionality over to OrderCloud. Once XC is removed, you can then migrate your XP features and then finally your XM features. The following migration guides can help with the OrderCloud migration, based on the features you are using:</p>

        <ul>
          <li><Link href="https://community.sitecore.com/community?id=community_blog&sys_id=89f8d1391b416154e55241dde54bcb88">Transitioning from Sitecore XC to OrderCloud: API Access</Link></li>
        <ConditionalResponse condition={xcFeaturesUsed.carts}>
          <li><Link href="https://community.sitecore.com/community?id=community_blog&sys_id=293153231b01a110e55241dde54bcba3">Transitioning from Sitecore XC to OrderCloud: Carts to Unsubmitted Orders and Carts</Link></li>
        </ConditionalResponse>
        <ConditionalResponse condition={xcFeaturesUsed.productCatalog}>
          <li><Link href="https://community.sitecore.com/community?id=community_blog&sys_id=0e1c6adb1b416910e55241dde54bcb9e">Transitioning from Sitecore XC to OrderCloud: Catalogs and Categories</Link></li>
        </ConditionalResponse>
        <ConditionalResponse condition={xcFeaturesUsed.productCatalog}>
          <li><Link href="https://community.sitecore.com/community?id=community_blog&sys_id=06a4f29f1b816910e55241dde54bcbb0">Transitioning from Sitecore XC to OrderCloud: Sellable Items to Products</Link></li>
        </ConditionalResponse>
        <ConditionalResponse condition={xcFeaturesUsed.customerAccounts}>
          <li><Link href="https://community.sitecore.com/community?id=community_blog&sys_id=0913197d1bcd2154e55241dde54bcb9f">Transitioning from Sitecore XC to OrderCloud: Customer to Buyer Users</Link></li>
        </ConditionalResponse>
        <ConditionalResponse condition={xcFeaturesUsed.fulfillments}>
          <li><Link href="https://community.sitecore.com/community?id=community_blog&sys_id=3826e72f1b81a110e55241dde54bcb7b">Transitioning from Sitecore XC to OrderCloud: Fulfillments to Shipping</Link></li>
        </ConditionalResponse>
        <ConditionalResponse condition={xcFeaturesUsed.inventory}>
          <li><Link href="https://community.sitecore.com/community?id=community_blog&sys_id=c7fb76571b056910e55241dde54bcb63">Transitioning from Sitecore XC to OrderCloud: Inventory and Pricing</Link></li>
        </ConditionalResponse>
        <ConditionalResponse condition={xcFeaturesUsed.orders || xcFeaturesUsed.shipping || xcFeaturesUsed.payment || xcFeaturesUsed.giftCards || xcFeaturesUsed.rma}>
          <li><Link href="https://community.sitecore.com/community?id=community_blog&sys_id=6925d18c1b5d6510e55241dde54bcbbf">Transitioning from Sitecore XC to OrderCloud: Orders</Link></li>
        </ConditionalResponse>
        <ConditionalResponse condition={xcFeaturesUsed.orders || xcFeaturesUsed.payment}>
          <li><Link href="https://community.sitecore.com/community?id=community_blog&sys_id=bc6e1dd41b192910e55241dde54bcbd3">Transitioning from Sitecore XC to OrderCloud: Order Workflow and Minions</Link></li>
        </ConditionalResponse>
        <ConditionalResponse condition={xcFeaturesUsed.payment}>
          <li><Link href="https://community.sitecore.com/community?id=community_blog&sys_id=c2bf81801b5d6510e55241dde54bcbd7">Transitioning from Sitecore XC to OrderCloud: Tax and Payments</Link></li>
        </ConditionalResponse>
        <ConditionalResponse condition={xcFeaturesUsed.promotions}>
          <li><Link href="https://community.sitecore.com/community?id=community_blog&sys_id=e3a389dd1b112910722d4042b24bcb93">Transitioning from Sitecore XC to OrderCloud: Promotions</Link></li>
        </ConditionalResponse>
        </ul>
      </ConditionalResponse>
      <ConditionalResponse condition={isXP}>
        <h2>Experience Platform (XP) migration</h2>
        <p>For your XP features, you will first want to migrate this functionality over it's matching SaaS component: Sitecore XM Cloud embedded personalization, Sitecore Personalize, Sitecore CDP, or Sitecore Send. Once XP features and infrastructure are removed, you can then migrate your content management features. The following migration guides can help with the XP migration, based on the features you are using:</p>

        <ul>
        <ConditionalResponse condition={xpFeaturesUsed.sessionPersonalization}>
          <li><Link href="https://jasonstcyr.com/2023/05/31/sitecore-architects-guide-to-saas-migration-classic-xp-with-simple-personalization/">Sitecore Architect’s Guide to SaaS Migration – Classic XP with Simple Personalization</Link></li>
        </ConditionalResponse>
        <ConditionalResponse condition={!xpFeaturesUsed.exm && !xpFeaturesUsed.marketingAutomation}>
          <li><Link href="https://jasonstcyr.com/2022/07/25/sitecore-architects-guide-to-saas-migration-xp-global-brand-scenario/">Sitecore Architect’s Guide to SaaS Migration – XP Global Brand scenario</Link></li>
        </ConditionalResponse>
        <ConditionalResponse condition={xpFeaturesUsed.exm && xpFeaturesUsed.marketingAutomation}>
          <li><Link href="https://jasonstcyr.com/2023/03/09/sitecore-architects-guide-to-saas-migration-xp-marketing-automation/">Sitecore Architect’s Guide to SaaS Migration – XP Marketing Automation</Link></li>
        </ConditionalResponse>
          <li><Link href="https://community.sitecore.com/community?id=community_blog&sys_id=f1cc98af1b541590e55241dde54bcb0d">Sitecore Platform DXP to Composable: CDP + Personalize Migration Strategies</Link></li>
        </ul>
      </ConditionalResponse>

      <ConditionalResponse condition={isXM}>
        <h2>Experience Manager (XM) migration</h2>
        <p>Based on how you've implemented the basic content management and delivery in your solution, you will need to take a different approach. Based on your selections, these are the guides that may help:</p>

        <ul>
          <ConditionalResponse condition={experienceEdgeYes || experienceEdgeSome}>
            <li><Link href="https://jasonstcyr.com/2022/05/20/sitecore-architects-guide-to-saas-migration-xm-jamstack-scenario/">Sitecore Architect’s Guide to SaaS Migration – XM Jamstack scenario</Link></li>
          </ConditionalResponse>
        </ul>          
      </ConditionalResponse>
      <ConditionalResponse condition={existingFrameworks.netcore}>
        <h2>Already on ASP.NET Core headless?</h2>
        There is a migration series by Rob Earlam discussing steps taken for a .NET Core site on Sitecore XM and migrating it to XM Cloud.
        <ul>
          <li><Link href="https://robearlam.com/blog/migrating-the-sitecore-mvp-site-to-xm-cloud-part-1">Migrating the Sitecore MVP site to XM Cloud – Part 1</Link></li>
          <li><Link href="https://robearlam.com/blog/migrating-the-sitecore-mvp-site-to-xm-cloud-part-2">Migrating the Sitecore MVP site to XM Cloud – Part 2</Link></li>
          <li><Link href="https://robearlam.com/blog/migrating-the-sitecore-mvp-site-to-xm-cloud-part-3">Migrating the Sitecore MVP site to XM Cloud – Part 3</Link></li>
          <ConditionalResponse condition={securedPages.securityloginrequired}>
            <li><Link href="https://robearlam.com/blog/migrating-the-sitecore-mvp-site-to-xm-cloud-part-4">Migrating the Sitecore MVP site to XM Cloud – Part 4</Link></li>
          </ConditionalResponse>
        </ul>
      </ConditionalResponse>
      <ul>
        <ConditionalResponse condition={desiredFrameworks.nextjs || desiredFrameworks.netcore}>
            <li><Link href="https://github.com/sitecore/xm-cloud-introduction">XM Cloud Introduction GitHub Repo: Shows Next.js and .NET headless sites migrated from XM 10.2</Link></li>
        </ConditionalResponse>
      </ul>
    </>
  );
};
