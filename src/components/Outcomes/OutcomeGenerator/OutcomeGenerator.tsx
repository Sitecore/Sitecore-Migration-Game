import { Blockquote, SimpleGrid, Text, Title } from '@mantine/core';
import { ConditionalResponse } from 'components/Outcomes';
import { LinkCard, RichTextOutput, YouTubeVideoDisplay, useGameInfoContext } from 'components/ui';
import { ExperienceEdgeOption, OutcomeConditions } from 'models/OutcomeConditions';
import { FC } from 'react';
import { FiActivity } from 'react-icons/fi';

interface OutcomeGeneratorProps {}

export const OutcomeGenerator: FC<OutcomeGeneratorProps> = () => {
  const gameInfoContext = useGameInfoContext();

  //If there is no Outcome information in the Game Info Context, we cannot output this page
  if (!gameInfoContext.outcome || !gameInfoContext.outcome.productsIntro) {
    let errorMessage = 'Missing Outcome content for current theme: ' + gameInfoContext.theme;
    console.error(errorMessage);
    return <div>{errorMessage}</div>;
  }

  //Use the OutcomeConditions class for storing all the answers as the conditions we'll use in the logic.
  let outcomeConditions = new OutcomeConditions(gameInfoContext);

  return (
    <>
      <Title order={2}>{gameInfoContext.outcome.title}</Title>
      <Text>
        <RichTextOutput content={gameInfoContext.outcome.productsIntro} />
      </Text>
      <Blockquote icon={<FiActivity />}>{outcomeConditions.requiredProducts().join(', ')}</Blockquote>

      <Title order={2}>{gameInfoContext.outcome.videoTitle}</Title>
      <Text>
        <RichTextOutput content={gameInfoContext.outcome.videoIntro} />
      </Text>
      <YouTubeVideoDisplay videoId={gameInfoContext.outcome.videoid} />
      <Text>
        <RichTextOutput content={gameInfoContext.outcome.guidesIntro} />
      </Text>
      <ConditionalResponse condition={outcomeConditions.isXC}>
        <Title order={2}>Experience Commerce (XC) migration</Title>
      </ConditionalResponse>
      <ConditionalResponse condition={outcomeConditions.isXP}>
        <Title order={2}>Experience Platform (XP) migration</Title>
      </ConditionalResponse>
      <ConditionalResponse condition={outcomeConditions.isXM}>
        <Title order={2}>Experience Manager (XM) migration</Title>
      </ConditionalResponse>
      <ConditionalResponse condition={outcomeConditions.isXC}>
        <Title order={3}>{gameInfoContext.outcome.xcFeaturesTitle}</Title>
        <Text>
          <RichTextOutput content={gameInfoContext.outcome.xcFeaturesIntro} />
        </Text>

        <SimpleGrid cols={3} spacing="md">
          <LinkCard
            link="https://community.sitecore.com/community?id=community_blog&sys_id=89f8d1391b416154e55241dde54bcb88"
            title="Transitioning from Sitecore XC to OrderCloud: API Access"
          />
          <ConditionalResponse condition={outcomeConditions.xcFeaturesUsed.carts}>
            <LinkCard
              link="https://community.sitecore.com/community?id=community_blog&sys_id=293153231b01a110e55241dde54bcba3"
              title="Transitioning from Sitecore XC to OrderCloud: Carts to Unsubmitted Orders and Carts"
            />
          </ConditionalResponse>
          <ConditionalResponse condition={outcomeConditions.xcFeaturesUsed.productCatalog}>
            <LinkCard
              link="https://community.sitecore.com/community?id=community_blog&sys_id=0e1c6adb1b416910e55241dde54bcb9e"
              title="Transitioning from Sitecore XC to OrderCloud: Catalogs and Categories"
            />
          </ConditionalResponse>
          <ConditionalResponse condition={outcomeConditions.xcFeaturesUsed.productCatalog}>
            <LinkCard
              link="https://community.sitecore.com/community?id=community_blog&sys_id=06a4f29f1b816910e55241dde54bcbb0"
              title="Transitioning from Sitecore XC to OrderCloud: Sellable Items to Products"
            />
          </ConditionalResponse>
          <ConditionalResponse condition={outcomeConditions.xcFeaturesUsed.customerAccounts}>
            <LinkCard
              link="https://community.sitecore.com/community?id=community_blog&sys_id=0913197d1bcd2154e55241dde54bcb9f"
              title="Transitioning from Sitecore XC to OrderCloud: Customer to Buyer Users"
            />
          </ConditionalResponse>
          <ConditionalResponse condition={outcomeConditions.xcFeaturesUsed.fulfillments}>
            <LinkCard
              link="https://community.sitecore.com/community?id=community_blog&sys_id=3826e72f1b81a110e55241dde54bcb7b"
              title="Transitioning from Sitecore XC to OrderCloud: Fulfillments to Shipping"
            />
          </ConditionalResponse>
          <ConditionalResponse condition={outcomeConditions.xcFeaturesUsed.inventory}>
            <LinkCard
              link="https://community.sitecore.com/community?id=community_blog&sys_id=c7fb76571b056910e55241dde54bcb63"
              title="Transitioning from Sitecore XC to OrderCloud: Inventory and Pricing"
            />
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
            <LinkCard
              link="https://community.sitecore.com/community?id=community_blog&sys_id=6925d18c1b5d6510e55241dde54bcbbf"
              title="Transitioning from Sitecore XC to OrderCloud: Orders"
            />
          </ConditionalResponse>
          <ConditionalResponse
            condition={outcomeConditions.xcFeaturesUsed.orders || outcomeConditions.xcFeaturesUsed.payment}
          >
            <LinkCard
              link="https://community.sitecore.com/community?id=community_blog&sys_id=bc6e1dd41b192910e55241dde54bcbd3"
              title="Transitioning from Sitecore XC to OrderCloud: Order Workflow and Minions"
            />
          </ConditionalResponse>
          <ConditionalResponse condition={outcomeConditions.xcFeaturesUsed.payment}>
            <LinkCard
              link="https://community.sitecore.com/community?id=community_blog&sys_id=c2bf81801b5d6510e55241dde54bcbd7"
              title="Transitioning from Sitecore XC to OrderCloud: Tax and Payments"
            />
          </ConditionalResponse>
          <ConditionalResponse condition={outcomeConditions.xcFeaturesUsed.promotions}>
            <LinkCard
              link="https://community.sitecore.com/community?id=community_blog&sys_id=e3a389dd1b112910722d4042b24bcb93"
              title="Transitioning from Sitecore XC to OrderCloud: Promotions"
            />
          </ConditionalResponse>
        </SimpleGrid>
      </ConditionalResponse>
      <ConditionalResponse condition={outcomeConditions.isXP || outcomeConditions.isXC}>
        <Title order={3}>{gameInfoContext.outcome.xpFeaturesTitle}</Title>
        <Text>
          <RichTextOutput content={gameInfoContext.outcome.xpFeaturesIntro} />
        </Text>

        <SimpleGrid cols={3} spacing="md">
          <ConditionalResponse condition={outcomeConditions.isSimplePersonalization()}>
            <LinkCard
              link="https://jasonstcyr.com/2023/05/31/sitecore-architects-guide-to-saas-migration-classic-xp-with-simple-personalization/"
              title="Sitecore Architect’s Guide to SaaS Migration – Classic XP with Simple Personalization"
            />
          </ConditionalResponse>
          <ConditionalResponse
            condition={outcomeConditions.isComplexPersonalization() && !outcomeConditions.isMarketingAutomation()}
          >
            <LinkCard
              link="https://jasonstcyr.com/2022/07/25/sitecore-architects-guide-to-saas-migration-xp-global-brand-scenario/"
              title="Sitecore Architect’s Guide to SaaS Migration – XP Global Brand scenario"
            />
          </ConditionalResponse>
          <ConditionalResponse condition={outcomeConditions.isMarketingAutomation()}>
            <LinkCard
              link="https://jasonstcyr.com/2023/03/09/sitecore-architects-guide-to-saas-migration-xp-marketing-automation/"
              title="Sitecore Architect’s Guide to SaaS Migration – XP Marketing Automation"
            />
          </ConditionalResponse>
          <LinkCard
            link="https://community.sitecore.com/community?id=community_blog&sys_id=f1cc98af1b541590e55241dde54bcb0d"
            title="Sitecore Platform DXP to Composable: CDP + Personalize Migration Strategies"
          />
        </SimpleGrid>
      </ConditionalResponse>
      <Title order={3}>{gameInfoContext.outcome.xmFeaturesTitle}</Title>
      <Text>
        <RichTextOutput content={gameInfoContext.outcome.xmFeaturesIntro} />
      </Text>
      <SimpleGrid cols={3} spacing="md">
        <ConditionalResponse
          condition={
            outcomeConditions.isXM &&
            (outcomeConditions.experienceEdge == ExperienceEdgeOption.yes ||
              outcomeConditions.experienceEdge == ExperienceEdgeOption.some)
          }
        >
          <LinkCard
            link="https://jasonstcyr.com/2022/05/20/sitecore-architects-guide-to-saas-migration-xm-jamstack-scenario/"
            title="Sitecore Architect’s Guide to SaaS Migration – XM Jamstack scenario"
          />
        </ConditionalResponse>
        <ConditionalResponse
          condition={outcomeConditions.desiredFrameworks.nextjs || outcomeConditions.desiredFrameworks.netcore}
        >
          <LinkCard
            link="https://github.com/sitecore/xm-cloud-introduction"
            title="XM Cloud Introduction GitHub Repo: Shows Next.js and .NET headless sites migrated from XM 10.2"
          />
        </ConditionalResponse>
      </SimpleGrid>
      <ConditionalResponse condition={outcomeConditions.existingFrameworks.netcore}>
        <Title order={4}>{gameInfoContext.outcome.aspnetHeadlessTitle}</Title>
        <Text>
          <RichTextOutput content={gameInfoContext.outcome.aspnetHeadlessIntro} />
        </Text>
        <SimpleGrid cols={3} spacing="md">
          <LinkCard
            link="https://robearlam.com/blog/migrating-the-sitecore-mvp-site-to-xm-cloud-part-1"
            title="Migrating the Sitecore MVP site to XM Cloud – Part 1"
          />
          <LinkCard
            link="https://robearlam.com/blog/migrating-the-sitecore-mvp-site-to-xm-cloud-part-2"
            title="Migrating the Sitecore MVP site to XM Cloud – Part 2"
          />
          <LinkCard
            link="https://robearlam.com/blog/migrating-the-sitecore-mvp-site-to-xm-cloud-part-3"
            title="Migrating the Sitecore MVP site to XM Cloud – Part 3"
          />
          <ConditionalResponse condition={outcomeConditions.securedPages.securityloginrequired}>
            <LinkCard
              link="https://robearlam.com/blog/migrating-the-sitecore-mvp-site-to-xm-cloud-part-4"
              title="Migrating the Sitecore MVP site to XM Cloud – Part 4"
            />
          </ConditionalResponse>
        </SimpleGrid>
      </ConditionalResponse>
    </>
  );
};
