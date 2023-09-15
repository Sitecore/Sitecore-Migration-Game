import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { useGameInfoContext } from 'components/Contexts';
import { ConditionalResponse } from 'components/Outcomes';
import { LinkCard, RichTextOutput, YouTubeVideoDisplay } from 'components/ui';
import { ExperienceEdgeOption, OutcomeConditions, TargetProduct } from 'models/OutcomeConditions';
import { FC } from 'react';

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

  const requiredProducts: TargetProduct[] = outcomeConditions.requiredProducts();

  return (
    <>
      <Heading size="lg" mb={2}>
        {gameInfoContext.outcome.title}
      </Heading>

      <Text>
        <RichTextOutput content={gameInfoContext.outcome.productsIntro} />
      </Text>
      {requiredProducts && requiredProducts.length > 0 && (
        <Accordion size="lg" pb="20px" id="required-products" allowMultiple>
          {requiredProducts.map((product: TargetProduct) => (
            <AccordionItem>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  <Heading size="md" mb={2}>
                    {product}
                  </Heading>
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel>
                {gameInfoContext.outcome?.outcomeReasons.results.find((r) => r.product === product) != undefined ? (
                  <RichTextOutput
                    content={
                      gameInfoContext.outcome?.outcomeReasons.results.find((r) => r.product === product)?.reason!
                    }
                  />
                ) : (
                  <></>
                )}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      )}

      <Heading size="lg" mb={2}>
        {gameInfoContext.outcome.videoTitle}
      </Heading>
      <Text>
        <RichTextOutput content={gameInfoContext.outcome.videoIntro} />
      </Text>
      <YouTubeVideoDisplay videoId={gameInfoContext.outcome.videoid} />
      <Text className="pt-4">
        <RichTextOutput content={gameInfoContext.outcome.guidesIntro} />
      </Text>
      <ConditionalResponse condition={outcomeConditions.isXC}>
        <Heading size="lg" mb={2}>
          Experience Commerce (XC) migration
        </Heading>
      </ConditionalResponse>
      <ConditionalResponse condition={outcomeConditions.isXP}>
        <Heading size="lg" mb={2}>
          Experience Platform (XP) migration
        </Heading>
      </ConditionalResponse>
      <ConditionalResponse condition={outcomeConditions.isXM}>
        <Heading size="lg" mb={2}>
          Experience Manager (XM) migration
        </Heading>
      </ConditionalResponse>
      <ConditionalResponse condition={outcomeConditions.isXC}>
        <Heading size="lg" mb={2}>
          {gameInfoContext.outcome.xcFeaturesTitle}
        </Heading>
        <Text>
          <RichTextOutput content={gameInfoContext.outcome.xcFeaturesIntro} />
        </Text>

        <SimpleGrid columns={3} minChildWidth="250px" spacing="md">
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
        <Heading size="lg" mb={2}>
          {gameInfoContext.outcome.xpFeaturesTitle}
        </Heading>
        <Text>
          <RichTextOutput content={gameInfoContext.outcome.xpFeaturesIntro} />
        </Text>

        <SimpleGrid columns={3} minChildWidth="250px" spacing="md">
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
      <Heading size="lg" mb={2}>
        {gameInfoContext.outcome.xmFeaturesTitle}
      </Heading>
      <Text>
        <RichTextOutput content={gameInfoContext.outcome.xmFeaturesIntro} />
      </Text>
      <SimpleGrid columns={3} minChildWidth="250px" spacing="md">
        {/*Rob Habraken SUGCON video*/}
        <YouTubeVideoDisplay videoId="vLAfx7dps_Q" />

        {/*Start articles*/}
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
        <ConditionalResponse condition={outcomeConditions.desiredFrameworks.nextjs}>
          <LinkCard
            link="https://thetombomb.com/posts/nextjs-hosting-alternatives"
            title="Beyond Vercel: Hosting Alternatives for Next.js"
          />
        </ConditionalResponse>
        <LinkCard
          link="https://jackspektor.medium.com/estimating-sitecore-xp-to-xm-cloud-upgrade-what-challenges-lies-ahead-226d1c36b8e"
          title="Estimating Sitecore XP to XM Cloud upgrade — what challenges lies ahead? (Jack Spektor)"
        />
        <ConditionalResponse condition={!outcomeConditions.isFullyHeadless()}>
          <LinkCard
            link="https://blogs.perficient.com/2022/11/28/a-practical-roadmap-for-existing-sitecore-customers-to-move-to-xm-cloud/"
            title="A Practical Roadmap for Existing Sitecore Customers to Move To XM Cloud (David San Filippo)"
          />
        </ConditionalResponse>
      </SimpleGrid>
      <ConditionalResponse condition={outcomeConditions.existingFrameworks.netcore}>
        <Heading size="lg" mb={2}>
          {gameInfoContext.outcome.aspnetHeadlessTitle}
        </Heading>
        <Text>
          <RichTextOutput content={gameInfoContext.outcome.aspnetHeadlessIntro} />
        </Text>
        <SimpleGrid columns={3} minChildWidth="250px" spacing="md">
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
