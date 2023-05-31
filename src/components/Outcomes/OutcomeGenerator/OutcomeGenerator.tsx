import { Text } from '@mantine/core';
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
      <Text>
        Based on what has been collected, we believe the following guides will be helpful in your Quest for SaaS! Good
        luck on your adventure to migrating to a composable DXP stack.
        <ConditionalResponse
          condition={
            gameInfoContext.answers?.find(
              (x: IAnswer) => x.promptQuestionId == PromptMappings.platform && x.value.includes('xc')
            ) != undefined
          }
        >
          <h2>Experience Commerce (XC) migration</h2>
          <p>
            For your XC features, you will first want to migrate this functionality over to OrderCloud. Once XC is
            removed, you can then migrate your XP features and then finally your XM features. The following migration
            guides can help with the OrderCloud migration, based on the features you are using:
          </p>

          <ul>
            <li>
              <Link href="https://community.sitecore.com/community?id=community_blog&sys_id=89f8d1391b416154e55241dde54bcb88">
                Transitioning from Sitecore XC to OrderCloud: API Access
              </Link>
            </li>
            <ConditionalResponse
              condition={
                gameInfoContext.answers?.find(
                  (x: IAnswer) => x.promptQuestionId == PromptMappings.xcFeatures && x.value.includes('xccarts')
                ) != undefined
              }
            >
              <li>
                <Link href="https://community.sitecore.com/community?id=community_blog&sys_id=293153231b01a110e55241dde54bcba3">
                  Transitioning from Sitecore XC to OrderCloud: Carts to Unsubmitted Orders and Carts
                </Link>
              </li>
            </ConditionalResponse>
            <ConditionalResponse
              condition={
                gameInfoContext.answers?.find(
                  (x: IAnswer) =>
                    x.promptQuestionId == PromptMappings.xcFeatures && x.value.includes('xcproductcatalog')
                ) != undefined
              }
            >
              <li>
                <Link href="https://community.sitecore.com/community?id=community_blog&sys_id=0e1c6adb1b416910e55241dde54bcb9e">
                  Transitioning from Sitecore XC to OrderCloud: Catalogs and Categories
                </Link>
              </li>
            </ConditionalResponse>
            <ConditionalResponse
              condition={
                gameInfoContext.answers?.find(
                  (x: IAnswer) =>
                    x.promptQuestionId == PromptMappings.xcFeatures && x.value.includes('xcproductcatalog')
                ) != undefined
              }
            >
              <li>
                <Link href="https://community.sitecore.com/community?id=community_blog&sys_id=06a4f29f1b816910e55241dde54bcbb0">
                  Transitioning from Sitecore XC to OrderCloud: Sellable Items to Products
                </Link>
              </li>
            </ConditionalResponse>
            <ConditionalResponse
              condition={
                gameInfoContext.answers?.find(
                  (x: IAnswer) =>
                    x.promptQuestionId == PromptMappings.xcFeatures && x.value.includes('xccustomeraccounts')
                ) != undefined
              }
            >
              <li>
                <Link href="https://community.sitecore.com/community?id=community_blog&sys_id=0913197d1bcd2154e55241dde54bcb9f">
                  Transitioning from Sitecore XC to OrderCloud: Customer to Buyer Users
                </Link>
              </li>
            </ConditionalResponse>
            <ConditionalResponse
              condition={
                gameInfoContext.answers?.find(
                  (x: IAnswer) => x.promptQuestionId == PromptMappings.xcFeatures && x.value.includes('xcfulfillments')
                ) != undefined
              }
            >
              <li>
                <Link href="https://community.sitecore.com/community?id=community_blog&sys_id=3826e72f1b81a110e55241dde54bcb7b">
                  Transitioning from Sitecore XC to OrderCloud: Fulfillments to Shipping
                </Link>
              </li>
            </ConditionalResponse>
            <ConditionalResponse
              condition={
                gameInfoContext.answers?.find(
                  (x: IAnswer) =>
                    x.promptQuestionId == PromptMappings.xcFeatures &&
                    (x.value.includes('xcinventory') || x.value.includes('xcpricebooks'))
                ) != undefined
              }
            >
              <li>
                <Link href="https://community.sitecore.com/community?id=community_blog&sys_id=c7fb76571b056910e55241dde54bcb63">
                  Transitioning from Sitecore XC to OrderCloud: Inventory and Pricing
                </Link>
              </li>
            </ConditionalResponse>
            <ConditionalResponse
              condition={
                gameInfoContext.answers?.find(
                  (x: IAnswer) =>
                    x.promptQuestionId == PromptMappings.xcFeatures &&
                    (x.value.includes('xcorders') ||
                      x.value.includes('xcshipping') ||
                      x.value.includes('xcpayment') ||
                      x.value.includes('xcgiftcards') ||
                      x.value.includes('xcrma'))
                ) != undefined
              }
            >
              <li>
                <Link href="https://community.sitecore.com/community?id=community_blog&sys_id=6925d18c1b5d6510e55241dde54bcbbf">
                  Transitioning from Sitecore XC to OrderCloud: Orders
                </Link>
              </li>
            </ConditionalResponse>
            <ConditionalResponse
              condition={
                gameInfoContext.answers?.find(
                  (x: IAnswer) =>
                    x.promptQuestionId == PromptMappings.xcFeatures &&
                    (x.value.includes('xcorders') || x.value.includes('xcpayment'))
                ) != undefined
              }
            >
              <li>
                <Link href="https://community.sitecore.com/community?id=community_blog&sys_id=bc6e1dd41b192910e55241dde54bcbd3">
                  Transitioning from Sitecore XC to OrderCloud: Order Workflow and Minions
                </Link>
              </li>
            </ConditionalResponse>
            <ConditionalResponse
              condition={
                gameInfoContext.answers?.find(
                  (x: IAnswer) => x.promptQuestionId == PromptMappings.xcFeatures && x.value.includes('xcpayment')
                ) != undefined
              }
            >
              <li>
                <Link href="https://community.sitecore.com/community?id=community_blog&sys_id=c2bf81801b5d6510e55241dde54bcbd7">
                  Transitioning from Sitecore XC to OrderCloud: Tax and Payments
                </Link>
              </li>
            </ConditionalResponse>
            <ConditionalResponse
              condition={
                gameInfoContext.answers?.find(
                  (x: IAnswer) => x.promptQuestionId == PromptMappings.xcFeatures && x.value.includes('xcpromotions')
                ) != undefined
              }
            >
              <li>
                <Link href="https://community.sitecore.com/community?id=community_blog&sys_id=e3a389dd1b112910722d4042b24bcb93">
                  Transitioning from Sitecore XC to OrderCloud: Promotions
                </Link>
              </li>
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
          <h2>Experience Platform (XP) migration</h2>
          <p>
            For your XP features, you will first want to migrate this functionality over it's matching SaaS component:
            Sitecore XM Cloud embedded personalization, Sitecore Personalize, Sitecore CDP, or Sitecore Send. Once XP
            features and infrastructure are removed, you can then migrate your content management features. The
            following migration guides can help with the XP migration, based on the features you are using:
          </p>

          <ul>
            <ConditionalResponse
              condition={
                gameInfoContext.answers?.find(
                  (x: IAnswer) =>
                    x.promptQuestionId == PromptMappings.xpFeatures &&
                    !x.value.includes('exm') &&
                    !x.value.includes('marketingautomation')
                ) != undefined
              }
            >
              <li>
                <Link href="https://jasonstcyr.com/2022/07/25/sitecore-architects-guide-to-saas-migration-xp-global-brand-scenario/">
                  Sitecore Architect’s Guide to SaaS Migration – XP Global Brand scenario
                </Link>
              </li>
            </ConditionalResponse>
            <ConditionalResponse
              condition={
                gameInfoContext.answers?.find(
                  (x: IAnswer) =>
                    x.promptQuestionId == PromptMappings.xpFeatures &&
                    (x.value.includes('exm') || x.value.includes('marketingautomation'))
                ) != undefined
              }
            >
              <li>
                <Link href="https://jasonstcyr.com/2023/03/09/sitecore-architects-guide-to-saas-migration-xp-marketing-automation/">
                  Sitecore Architect’s Guide to SaaS Migration – XP Marketing Automation
                </Link>
              </li>
            </ConditionalResponse>
            <li>
              <Link href="https://community.sitecore.com/community?id=community_blog&sys_id=f1cc98af1b541590e55241dde54bcb0d">
                Sitecore Platform DXP to Composable: CDP + Personalize Migration Strategies
              </Link>
            </li>
          </ul>
        </ConditionalResponse>
        <ConditionalResponse
          condition={
            gameInfoContext.answers?.find(
              (x: IAnswer) => x.promptQuestionId == PromptMappings.platform && x.value.includes('xm')
            ) != undefined
          }
        >
          <h2>Experience Manager (XM) migration</h2>
          <p>
            Based on how you've implemented the basic content management and delivery in your solution, you will need to
            take a different approach. Based on your selections, these are the guides that may help:
          </p>

          <ul>
            <ConditionalResponse
              condition={
                gameInfoContext.answers?.find(
                  (x: IAnswer) =>
                    x.promptQuestionId == PromptMappings.experienceEdge &&
                    (x.value.includes('yesexperienceedge') || x.value.includes('someexperienceedge'))
                ) != undefined
              }
            >
              <li>
                <Link href="https://jasonstcyr.com/2022/05/20/sitecore-architects-guide-to-saas-migration-xm-jamstack-scenario/">
                  Sitecore Architect’s Guide to SaaS Migration – XM Jamstack scenario
                </Link>
              </li>
            </ConditionalResponse>
          </ul>
        </ConditionalResponse>
        <ConditionalResponse
          condition={
            gameInfoContext.answers?.find(
              (x: IAnswer) => x.promptQuestionId == PromptMappings.existingFramework && x.value.includes('netcore')
            ) != undefined
          }
        >
          <h2>Already on ASP.NET Core headless?</h2>
          There is a migration series by Rob Earlam discussing steps taken for a .NET Core site on Sitecore XM and
          migrating it to XM Cloud.
          <ul>
            <li>
              <Link href="https://robearlam.com/blog/migrating-the-sitecore-mvp-site-to-xm-cloud-part-1">
                Migrating the Sitecore MVP site to XM Cloud – Part 1
              </Link>
            </li>
            <li>
              <Link href="https://robearlam.com/blog/migrating-the-sitecore-mvp-site-to-xm-cloud-part-2">
                Migrating the Sitecore MVP site to XM Cloud – Part 2
              </Link>
            </li>
            <li>
              <Link href="https://robearlam.com/blog/migrating-the-sitecore-mvp-site-to-xm-cloud-part-3">
                Migrating the Sitecore MVP site to XM Cloud – Part 3
              </Link>
            </li>
            <ConditionalResponse
              condition={
                gameInfoContext.answers?.find(
                  (x: IAnswer) =>
                    x.promptQuestionId == PromptMappings.securePages && x.value.includes('securityloginrequired')
                ) != undefined
              }
            >
              <li>
                <Link href="https://robearlam.com/blog/migrating-the-sitecore-mvp-site-to-xm-cloud-part-4">
                  Migrating the Sitecore MVP site to XM Cloud – Part 4
                </Link>
              </li>
            </ConditionalResponse>
          </ul>
        </ConditionalResponse>
        <ul>
          <ConditionalResponse
            condition={
              gameInfoContext.answers?.find(
                (x: IAnswer) =>
                  x.promptQuestionId == PromptMappings.desiredFramework &&
                  (x.value.includes('nextjs') || x.value.includes('netcore'))
              ) != undefined
            }
          >
            <li>
              <Link href="https://github.com/sitecore/xm-cloud-introduction">
                XM Cloud Introduction GitHub Repo: Shows Next.js and .NET headless sites migrated from XM 10.2
              </Link>
            </li>
          </ConditionalResponse>
        </ul>
      </Text>
    </>
  );
};
