import { ConditionalResponse } from 'components/Outcomes';
import { useGameInfoContext } from 'components/ui';
import { IAnswer, PromptMappings } from 'models';
import Link from 'next/link';
import { FC } from 'react';

interface OutcomeGeneratorProps {}

export const OutcomeGenerator: FC<OutcomeGeneratorProps> = () => {
  const gameInfoContext = useGameInfoContext();

  return (
    <>
      Based on what has been collected, we believe the following guides will be helpful in your Quest for SaaS! Good luck on your adventure to migrating to a composable DXP stack.
      <ConditionalResponse
        condition={
          gameInfoContext.answers?.find(
            (x: IAnswer) => x.promptQuestionId == PromptMappings.platform && x.value.includes('xc')
          ) != undefined
        }
      >
        <h2>Experience Commerce migration</h2>
        <p>For your Experience Commerce features, you will first want to migrate this functionality over to OrderCloud. Once XC is removed, you can then migrate your XP features and then finally your XM features. The following migration guides can help with the OrderCloud migration, based on the features you are using:</p>

        <ul>
          <li><Link href="https://community.sitecore.com/community?id=community_blog&sys_id=89f8d1391b416154e55241dde54bcb88">Transitioning from Sitecore XC to OrderCloud: API Access</Link></li>
        <ConditionalResponse
          condition={
            gameInfoContext.answers?.find(
              (x: IAnswer) => x.promptQuestionId == PromptMappings.xcFeatures && x.value.includes('xccarts')
            ) != undefined
          }
        >
          <li><Link href="https://community.sitecore.com/community?id=community_blog&sys_id=293153231b01a110e55241dde54bcba3">Transitioning from Sitecore XC to OrderCloud: Carts to Unsubmitted Orders and Carts</Link></li>
        </ConditionalResponse>
        <ConditionalResponse
          condition={
            gameInfoContext.answers?.find(
              (x: IAnswer) => x.promptQuestionId == PromptMappings.xcFeatures && x.value.includes('xcproductcatalog')
            ) != undefined
          }
        >
          <li><Link href="https://community.sitecore.com/community?id=community_blog&sys_id=0e1c6adb1b416910e55241dde54bcb9e">Transitioning from Sitecore XC to OrderCloud: Catalogs and Categories</Link></li>
        </ConditionalResponse>
        <ConditionalResponse
          condition={
            gameInfoContext.answers?.find(
              (x: IAnswer) => x.promptQuestionId == PromptMappings.xcFeatures && x.value.includes('xcproductcatalog')
            ) != undefined
          }
        >
          <li><Link href="https://community.sitecore.com/community?id=community_blog&sys_id=06a4f29f1b816910e55241dde54bcbb0">Transitioning from Sitecore XC to OrderCloud: Sellable Items to Products</Link></li>
        </ConditionalResponse>
        <ConditionalResponse
          condition={
            gameInfoContext.answers?.find(
              (x: IAnswer) => x.promptQuestionId == PromptMappings.xcFeatures && x.value.includes('xccustomeraccounts')
            ) != undefined
          }
        >
          <li><Link href="https://community.sitecore.com/community?id=community_blog&sys_id=0913197d1bcd2154e55241dde54bcb9f">Transitioning from Sitecore XC to OrderCloud: Customer to Buyer Users</Link></li>
        </ConditionalResponse>
        <ConditionalResponse
          condition={
            gameInfoContext.answers?.find(
              (x: IAnswer) => x.promptQuestionId == PromptMappings.xcFeatures && x.value.includes('xcfulfillments')
            ) != undefined
          }
        >
          <li><Link href="https://community.sitecore.com/community?id=community_blog&sys_id=3826e72f1b81a110e55241dde54bcb7b">Transitioning from Sitecore XC to OrderCloud: Fulfillments to Shipping</Link></li>
        </ConditionalResponse>
        <ConditionalResponse
          condition={
            gameInfoContext.answers?.find(
              (x: IAnswer) => x.promptQuestionId == PromptMappings.xcFeatures && (x.value.includes('xcinventory') || x.value.includes("xcpricebooks"))
            ) != undefined
          }
        >
          <li><Link href="https://community.sitecore.com/community?id=community_blog&sys_id=c7fb76571b056910e55241dde54bcb63">Transitioning from Sitecore XC to OrderCloud: Inventory and Pricing</Link></li>
        </ConditionalResponse>
        <ConditionalResponse
          condition={
            gameInfoContext.answers?.find(
              (x: IAnswer) => x.promptQuestionId == PromptMappings.xcFeatures && (x.value.includes('xcorders') || x.value.includes("xcshipping") || x.value.includes("xcpayment") || x.value.includes("xcgiftcards") || x.value.includes("xcrma") )
            ) != undefined
          }
        >
          <li><Link href="https://community.sitecore.com/community?id=community_blog&sys_id=6925d18c1b5d6510e55241dde54bcbbf">Transitioning from Sitecore XC to OrderCloud: Orders</Link></li>
        </ConditionalResponse>
        <ConditionalResponse
          condition={
            gameInfoContext.answers?.find(
              (x: IAnswer) => x.promptQuestionId == PromptMappings.xcFeatures && (x.value.includes('xcorders') ||  x.value.includes("xcpayment") )
            ) != undefined
          }
        >
          <li><Link href="https://community.sitecore.com/community?id=community_blog&sys_id=bc6e1dd41b192910e55241dde54bcbd3">Transitioning from Sitecore XC to OrderCloud: Order Workflow and Minions</Link></li>
        </ConditionalResponse>
        <ConditionalResponse
          condition={
            gameInfoContext.answers?.find(
              (x: IAnswer) => x.promptQuestionId == PromptMappings.xcFeatures && x.value.includes("xcpayment") 
            ) != undefined
          }
        >
          <li><Link href="https://community.sitecore.com/community?id=community_blog&sys_id=c2bf81801b5d6510e55241dde54bcbd7">Transitioning from Sitecore XC to OrderCloud: Tax and Payments</Link></li>
        </ConditionalResponse>
        <ConditionalResponse
          condition={
            gameInfoContext.answers?.find(
              (x: IAnswer) => x.promptQuestionId == PromptMappings.xcFeatures && x.value.includes('xcpromotions')
            ) != undefined
          }
        >
          <li><Link href="https://community.sitecore.com/community?id=community_blog&sys_id=e3a389dd1b112910722d4042b24bcb93">Transitioning from Sitecore XC to OrderCloud: Promotions</Link></li>
        </ConditionalResponse>
        </ul>
      </ConditionalResponse>
      <ConditionalResponse
        condition={
          gameInfoContext.answers?.find(
            (x: IAnswer) => x.promptQuestionId == PromptMappings.platform && x.value.includes('xp')
          ) != undefined
        }
      >
        <Link href="https://developers.sitecore.com/">User chose XP as their platform</Link>
        <ConditionalResponse
          condition={
            gameInfoContext.answers?.find(
              (x: IAnswer) => x.promptQuestionId == PromptMappings.existingFramework && x.value.includes('nextjs')
            ) != undefined
          }
        >
          <Link href="https://nextjs.org/">Next.js Docs</Link>
        </ConditionalResponse>
      </ConditionalResponse>
      <ConditionalResponse
        condition={
          gameInfoContext.answers?.find(
            (x: IAnswer) => x.promptQuestionId == PromptMappings.platform && x.value.includes('xm')
          ) != undefined
        }
      >
        <Link href="https://developers.sitecore.com/">User chose XM as their platform</Link>
      </ConditionalResponse>
    </>
  );
};
