import { Text } from '@mantine/core';
import { ConditionalResponse } from 'components/Outcomes';
import { useGameInfoContext } from 'components/ui';
import { ExperienceEdgeOption, OutcomeConditions } from 'models/OutcomeConditions';
import Link from 'next/link';
import { FC } from 'react';

interface OutcomeGeneratorProps {}

export const OutcomeGenerator: FC<OutcomeGeneratorProps> = () => {
  const gameInfoContext = useGameInfoContext();

  //Use the OutcomeConditions class for storing all the answers as the conditions we'll use in the logic.
  let outcomeConditions = new OutcomeConditions(gameInfoContext);

  return (
    <Text>
      Based on what has been collected, we believe the following guides will be helpful in your Quest for SaaS! Good
      luck on your adventure to migrating to a composable DXP stack.
      <ConditionalResponse condition={outcomeConditions.isXC}>
        <h2>Experience Commerce (XC) migration</h2>
      </ConditionalResponse>
      <ConditionalResponse condition={outcomeConditions.isXP}>
        <h2>Experience Platform (XP) migration</h2>
      </ConditionalResponse>
      <ConditionalResponse condition={outcomeConditions.isXM}>
        <h2>Experience Manager (XM) migration</h2>
      </ConditionalResponse>
      <ConditionalResponse condition={outcomeConditions.isXC}>
        <h3>XC features</h3>
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
          <ConditionalResponse condition={outcomeConditions.xcFeaturesUsed.carts}>
            <li>
              <Link href="https://community.sitecore.com/community?id=community_blog&sys_id=293153231b01a110e55241dde54bcba3">
                Transitioning from Sitecore XC to OrderCloud: Carts to Unsubmitted Orders and Carts
              </Link>
            </li>
          </ConditionalResponse>
          <ConditionalResponse condition={outcomeConditions.xcFeaturesUsed.productCatalog}>
            <li>
              <Link href="https://community.sitecore.com/community?id=community_blog&sys_id=0e1c6adb1b416910e55241dde54bcb9e">
                Transitioning from Sitecore XC to OrderCloud: Catalogs and Categories
              </Link>
            </li>
          </ConditionalResponse>
          <ConditionalResponse condition={outcomeConditions.xcFeaturesUsed.productCatalog}>
            <li>
              <Link href="https://community.sitecore.com/community?id=community_blog&sys_id=06a4f29f1b816910e55241dde54bcbb0">
                Transitioning from Sitecore XC to OrderCloud: Sellable Items to Products
              </Link>
            </li>
          </ConditionalResponse>
          <ConditionalResponse condition={outcomeConditions.xcFeaturesUsed.customerAccounts}>
            <li>
              <Link href="https://community.sitecore.com/community?id=community_blog&sys_id=0913197d1bcd2154e55241dde54bcb9f">
                Transitioning from Sitecore XC to OrderCloud: Customer to Buyer Users
              </Link>
            </li>
          </ConditionalResponse>
          <ConditionalResponse condition={outcomeConditions.xcFeaturesUsed.fulfillments}>
            <li>
              <Link href="https://community.sitecore.com/community?id=community_blog&sys_id=3826e72f1b81a110e55241dde54bcb7b">
                Transitioning from Sitecore XC to OrderCloud: Fulfillments to Shipping
              </Link>
            </li>
          </ConditionalResponse>
          <ConditionalResponse condition={outcomeConditions.xcFeaturesUsed.inventory}>
            <li>
              <Link href="https://community.sitecore.com/community?id=community_blog&sys_id=c7fb76571b056910e55241dde54bcb63">
                Transitioning from Sitecore XC to OrderCloud: Inventory and Pricing
              </Link>
            </li>
          </ConditionalResponse>
          <ConditionalResponse
            condition={
              outcomeConditions.xcFeaturesUsed.orders ||
              outcomeConditions.xcFeaturesUsed.shipping ||
              outcomeConditions.xcFeaturesUsed.payment ||
              outcomeConditions.xcFeaturesUsed.giftCards ||
              outcomeConditions.xcFeaturesUsed.rma
            }
          >
            <li>
              <Link href="https://community.sitecore.com/community?id=community_blog&sys_id=6925d18c1b5d6510e55241dde54bcbbf">
                Transitioning from Sitecore XC to OrderCloud: Orders
              </Link>
            </li>
          </ConditionalResponse>
          <ConditionalResponse
            condition={outcomeConditions.xcFeaturesUsed.orders || outcomeConditions.xcFeaturesUsed.payment}
          >
            <li>
              <Link href="https://community.sitecore.com/community?id=community_blog&sys_id=bc6e1dd41b192910e55241dde54bcbd3">
                Transitioning from Sitecore XC to OrderCloud: Order Workflow and Minions
              </Link>
            </li>
          </ConditionalResponse>
          <ConditionalResponse condition={outcomeConditions.xcFeaturesUsed.payment}>
            <li>
              <Link href="https://community.sitecore.com/community?id=community_blog&sys_id=c2bf81801b5d6510e55241dde54bcbd7">
                Transitioning from Sitecore XC to OrderCloud: Tax and Payments
              </Link>
            </li>
          </ConditionalResponse>
          <ConditionalResponse condition={outcomeConditions.xcFeaturesUsed.promotions}>
            <li>
              <Link href="https://community.sitecore.com/community?id=community_blog&sys_id=e3a389dd1b112910722d4042b24bcb93">
                Transitioning from Sitecore XC to OrderCloud: Promotions
              </Link>
            </li>
          </ConditionalResponse>
        </ul>
      </ConditionalResponse>
      <ConditionalResponse condition={outcomeConditions.isXP || outcomeConditions.isXC}>
        <h3>XP features</h3>
        <p>
          For your XP features, you will first want to migrate this functionality over it's matching SaaS component:
          Sitecore XM Cloud embedded personalization, Sitecore Personalize, Sitecore CDP, or Sitecore Send. Once XP
          features and infrastructure are removed, you can then migrate your content management features. The following
          migration guides can help with the XP migration, based on the features you are using:
        </p>

        <ul>
          <ConditionalResponse condition={outcomeConditions.isSimplePersonalization()}>
            <li>
              <Link href="https://jasonstcyr.com/2023/05/31/sitecore-architects-guide-to-saas-migration-classic-xp-with-simple-personalization/">
                Sitecore Architect’s Guide to SaaS Migration – Classic XP with Simple Personalization
              </Link>
            </li>
          </ConditionalResponse>
          <ConditionalResponse
            condition={outcomeConditions.isComplexPersonalization() && !outcomeConditions.isMarketingAutomation()}
          >
            <li>
              <Link href="https://jasonstcyr.com/2022/07/25/sitecore-architects-guide-to-saas-migration-xp-global-brand-scenario/">
                Sitecore Architect’s Guide to SaaS Migration – XP Global Brand scenario
              </Link>
            </li>
          </ConditionalResponse>
          <ConditionalResponse
            condition={outcomeConditions.xpFeaturesUsed.exm && outcomeConditions.xpFeaturesUsed.marketingAutomation}
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
      <h3>XM features</h3>
      <p>
        Based on your selections, these are the guides that may help with the content management and delivery portions
        of your solution:
      </p>
      <ul>
        <ConditionalResponse
          condition={
            outcomeConditions.isXM &&
            (outcomeConditions.experienceEdge == ExperienceEdgeOption.yes ||
              outcomeConditions.experienceEdge == ExperienceEdgeOption.some)
          }
        >
          <li>
            <Link href="https://jasonstcyr.com/2022/05/20/sitecore-architects-guide-to-saas-migration-xm-jamstack-scenario/">
              Sitecore Architect’s Guide to SaaS Migration – XM Jamstack scenario
            </Link>
          </li>
        </ConditionalResponse>
        <ConditionalResponse
          condition={outcomeConditions.desiredFrameworks.nextjs || outcomeConditions.desiredFrameworks.netcore}
        >
          <li>
            <Link href="https://github.com/sitecore/xm-cloud-introduction">
              XM Cloud Introduction GitHub Repo: Shows Next.js and .NET headless sites migrated from XM 10.2
            </Link>
          </li>
        </ConditionalResponse>
      </ul>
      <ConditionalResponse condition={outcomeConditions.existingFrameworks.netcore}>
        <h4>Already on ASP.NET Core headless?</h4>
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
          <ConditionalResponse condition={outcomeConditions.securedPages.securityloginrequired}>
            <li>
              <Link href="https://robearlam.com/blog/migrating-the-sitecore-mvp-site-to-xm-cloud-part-4">
                Migrating the Sitecore MVP site to XM Cloud – Part 4
              </Link>
            </li>
          </ConditionalResponse>
        </ul>
      </ConditionalResponse>
    </Text>
  );
};
