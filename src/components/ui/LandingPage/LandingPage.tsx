import { Box, Button, Container, Grid, HStack, Heading, Image, Stack, Text } from '@chakra-ui/react';
import { Layout } from 'components/ui';
import FeatureCard, { FeatureCardProps } from 'components/ui/LandingPage/FeatureCard';
import LandingPageHeader from 'components/ui/LandingPage/Header';
import Link from 'next/link';
import React from 'react';

const LandingPage: React.FC = () => {
  return (
    <Layout minHeight={'100vh'} px={{ sm: '4', md: '0' }}>
      <LandingPageHeader />
      <Stack gap={28} width={'full'} pb={10} pt={{ sm: 0, md: 28 }}>
        {/* Hero Banner */}
        <Container maxW={'5xl'}>
          <Stack align={'center'} spacing={{ base: 4, md: 8 }} direction={{ base: 'column-reverse', lg: 'row' }}>
            <Stack flex={1} spacing={{ base: 2, md: 4 }} width={{ sm: '90%', md: '50%' }}>
              <Heading variant="section">Migration made easy</Heading>
              <Heading as={'h1'} size={'xl'}>
                Find your way to Sitecore's Composable DXP with confidence!
              </Heading>
              <Text>
                The benefits of migrating to the cloud with Sitecore's Composable DXP are clear: no more costly
                upgrades, lower total cost of ownership (TCO), lightning fast site speed and quicker to market with new
                content, all in a modern UI that updates with new features automatically.
              </Text>
              <Text>
                The path to get there is different for every individual and organization. We can guide you through the
                journey, regardless of your starting point.
              </Text>
              <Text>
                Tell the Sitecore Migration Advisor about your solution and then find videos, tutorials, walkthroughs,
                code examples, and more to help you migrate from Sitecore Platform DXP to Sitecore XM Cloud and the rest
                of the Sitecore Composable DXP.
              </Text>
              <HStack w="full">
                <Link style={{ width: '100%' }} href="/settings">
                  <Button id="start" w="full">
                    Get Started
                  </Button>
                </Link>
                <Link
                  style={{ width: '100%' }}
                  href="https://www.sitecore.com/resources/insights/content-management/xm-cloud-6-benefits-for-your-business"
                  target="_blank"
                >
                  <Button id="start" w="full" variant="ghost" shadow="md" bg="chakra-body-bg">
                    Why migrate?
                  </Button>
                </Link>
              </HStack>
            </Stack>
            <Image
              src="https://delivery-sitecore.sitecorecontenthub.cloud/api/public/content/79641d4e53c04ad9a1f9307bccae1458?v=ef401c0b"
              alt="Sitecore Migration Advisor"
              borderRadius="md"
              width="50%"
            />
          </Stack>
        </Container>
        {/* Features */}
        <Container maxW={'5xl'}>
          <Stack spacing={4} as={Container} maxW={'5xl'} textAlign={'center'}>
            <Heading>Making Migrations Easier</Heading>
            <Text>
              So you’ve decided to move to the cloud (great choice), but you want to know which of Sitecore's SaaS
              products are right for your business? Find the resources you need to migrate to our new SaaS DXP from
              Sitecore's traditional platform products like Experience Manager (XM), Experience Platform (XP), and
              Experience Commerce (XC).
            </Text>
          </Stack>
          <Grid
            templateColumns={{ base: `repeat(2}, 1fr)`, md: `repeat(4, 1fr)`, lg: `repeat(4, 1fr)` }}
            gap={6}
            alignItems={'items-stretch'}
            mt={12}
            pb={12}
          >
            {features.map((feature, idx) => (
              <FeatureCard key={idx} heading={feature.heading} text={feature.text} />
            ))}
          </Grid>
        </Container>
      </Stack>

      <Box p="4" bg="neutral-fg" textColor="chakra-inverse-text" bottom={0} position="absolute" width="full">
        <Text>© Copyright 2023, Sitecore. All Rights Reserved</Text>
      </Box>
    </Layout>
  );
};

export default LandingPage;

const features: FeatureCardProps[] = [
  {
    heading: 'Step 1: Answer Questions',
    text: 'Tell us which features are important in creating your digital experiences.',
  },
  {
    heading: 'Step 2: Get Recommendations',
    text: 'Receive personalized product recommendations for the capabilities that matter to you.',
  },
  {
    heading: 'Step 3: Find Helpful Content',
    text: 'Find a collection of curated migration content created by Sitecore and the community, personalized to your context.',
  },
  {
    heading: 'Step 4: Give Feedback!',
    text: 'Are we missing something you need? Do you have more questions? Use our in-app feedback form to let us know how we can help!',
  },
];
