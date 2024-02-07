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
import { LinkCard, Loading, RichTextOutput, YouTubeVideoDisplay } from 'components/ui';
import { OutcomeService } from 'lib/OutcomeService';
import { IOutcome } from 'models';
import { ExperienceEdgeOption, OutcomeConditions, TargetProduct } from 'models/OutcomeConditions';
import { FC, useCallback, useEffect, useState } from 'react';

interface OutcomeGeneratorProps {}

export const OutcomeGenerator: FC<OutcomeGeneratorProps> = () => {
  const gameInfoContext = useGameInfoContext();
  const [outcome, setOutcome] = useState<IOutcome | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const outcomeService = OutcomeService();

  // Pull Outcome Content here instead on load
  const loadOutcomeResults = useCallback(async () => {
    setLoading(true);
    // TODO: Default to Corporate theme, will need to fix this line when theme switching is implemented again
    const outcomeResult = await outcomeService.GetOutcome();

    if (outcomeResult?.results) {
      // Only set outcome with the first result
      if (outcomeResult.results.length > 0) {
        setOutcome(outcomeResult.results[0]);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadOutcomeResults();
  }, [loadOutcomeResults]);

  if (loading || outcome === undefined) {
    return (
      <div>
        <Loading message="Loading the Outcome results..." />
      </div>
    );
  }

  if (outcome === undefined) {
    return (
      <div>
        <Heading size="lg" mb={2}>
          No outcome found
        </Heading>
        <Text>No outcome was found for the answers you provided. Please try again.</Text>
      </div>
    );
  }

  //Use the OutcomeConditions class for storing all the answers as the conditions we'll use in the logic.
  let outcomeConditions = new OutcomeConditions(gameInfoContext);

  const requiredProducts: TargetProduct[] = outcomeConditions.requiredProducts();

  return (
    <>
      <Heading size="lg" mb={2}>
        {outcome.title}
      </Heading>

      <Text>
        <RichTextOutput content={outcome.productsIntro} />
      </Text>
      {requiredProducts && requiredProducts.length > 0 && (
        <Accordion size="lg" pb="20px" id="required-products" allowMultiple>
          {requiredProducts.map((product: TargetProduct, idx) => (
            <AccordionItem key={idx}>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  <Heading size="md" mb={2}>
                    {product}
                  </Heading>
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel>
                {outcome?.outcomeReasons.results.find((r) => r.product === product) != undefined ? (
                  <RichTextOutput
                    content={outcome?.outcomeReasons.results.find((r) => r.product === product)?.reason!}
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
        {outcome.videoTitle}
      </Heading>
      <Text>
        <RichTextOutput content={outcome.videoIntro} />
      </Text>
      <YouTubeVideoDisplay videoId={outcome.videoid} />
      <Text className="pt-4">
        <RichTextOutput content={outcome.guidesIntro} />
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
          {outcome.xcFeaturesTitle}
        </Heading>
        <Text>
          <RichTextOutput content={outcome.xcFeaturesIntro} />
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
          {outcome.xpFeaturesTitle}
        </Heading>
        <Text>
          <RichTextOutput content={outcome.xpFeaturesIntro} />
        </Text>

        <SimpleGrid columns={3} minChildWidth="250px" spacing="md">
          <ConditionalResponse condition={outcomeConditions.isSimplePersonalization()}>
            <LinkCard
              link="https://community.sitecore.com/community?id=community_blog&sys_id=9fb319151b23e510efd0ec22604bcb12"
              title="Sitecore Architect’s Guide to SaaS Migration – Classic XP with Simple Personalization"
            />
          </ConditionalResponse>
          <ConditionalResponse
            condition={outcomeConditions.isComplexPersonalization() && !outcomeConditions.isMarketingAutomation()}
          >
            <LinkCard
              link="https://community.sitecore.com/community?id=community_blog&sys_id=ae56931f1b462554722d4042b24bcb76"
              title="Sitecore Architect’s Guide to SaaS Migration – XP Global Brand scenario"
            />
          </ConditionalResponse>
          <ConditionalResponse condition={outcomeConditions.isMarketingAutomation()}>
            <LinkCard
              link="https://community.sitecore.com/community?id=community_blog&sys_id=f61af8f41b176910722d4042b24bcb72"
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
        {outcome.xmFeaturesTitle}
      </Heading>
      <Text>
        <RichTextOutput content={outcome.xmFeaturesIntro} />
      </Text>
      <SimpleGrid columns={3} minChildWidth="250px" spacing="md">
        {/* Content migration tool */}
        <LinkCard
          link="https://developers.sitecore.com/downloads/xm-cloud#xm-to-xm-cloud-content-migration-tool"
          title="XM to XM Cloud Content Migration tool"
          description="Move content, media and user data from a source XM on-premises instance to a target XM Cloud environment."
          buttonText="Download"
        />

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
            link="https://community.sitecore.com/community?id=community_blog&sys_id=7c74bbfa1bb5e590b8954371b24bcb7b"
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
            link="https://developers.sitecore.com/learn/getting-started/next-js"
            title="Next.js Learning Resources"
          />
          <LinkCard
            link="https://thetombomb.com/posts/nextjs-hosting-alternatives"
            title="Beyond Vercel: Hosting Alternatives for Next.js"
          />
          <LinkCard
            link="https://sitecore-nextjs-guide.hakmeng.com"
            title="Beginner's Guide to developing with Sitecore Next.js (Meng Hak)"
          />
        </ConditionalResponse>
        <ConditionalResponse condition={outcomeConditions.serializationUsed.tds}>
          <LinkCard
            link="https://community.sitecore.com/community?id=community_blog&sys_id=9390c8a91b76359438a46421b24bcb40"
            title="Converting a TDS project to Sitecore Content Serialization (SCS)"
          />
          <LinkCard
            link="https://gist.github.com/bic742/f77783c643420b704535d88fcbb5b18e"
            title="PowerShell script to generate SCS JSON files from TDS projects (Aaron Bickle)"
          />
          <LinkCard
            link="https://github.com/josephjlong/sitecore-serialisation-converter"
            title=".NET application to convert TDS projects into SCS JSON files (Joseph Long)"
          />
        </ConditionalResponse>
        <ConditionalResponse condition={outcomeConditions.serializationUsed.unicorn}>
          <LinkCard
            link="https://community.sitecore.com/community?id=community_blog&sys_id=64fdcd651bb6759438a46421b24bcb5a"
            title="Converting a Unicorn project to Sitecore Content Serialization (SCS)"
          />
          <LinkCard
            link="https://medium.com/@mitya_1988/convert-unicorn-serialization-configs-into-sitecore-content-serialization-module-json-with-1a4e93661616"
            title="Convert Unicorn serialization to SCS JSON with PowerShell (Mihály Árvai)"
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
          {outcome.aspnetHeadlessTitle}
        </Heading>
        <Text>
          <RichTextOutput content={outcome.aspnetHeadlessIntro} />
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
