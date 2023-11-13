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
                Know your way when migrating to Sitecore's Composable DXP
              </Heading>
              <Text>
                Everyone has their own journey when it comes to migrating to the cloud, but we are here to help you
                understand what's involved no matter where you are coming from.
              </Text>
              <Text>
                Find videos, tutorials, walkthroughs, code examples, and more to help you migrate from Sitecore Platform
                DXP to Sitecore XM Cloud and the rest of the Sitecore Composable DXP.
              </Text>
              <HStack w="full">
                <Link style={{ width: '100%' }} href="/settings">
                  <Button id="start" w="full">
                    Get Started
                  </Button>
                </Link>
              </HStack>
            </Stack>
            <Image
              src="https://wwwsitecorecom.azureedge.net/-/media/sitecoresite/images/home/knowledge-center/digital-marketing-resources/migrating-to-xm-cloud/gettyimages-898545250.jpg?mw=310&md=20230901T160358Z&hash=CA7AE4A53096E607A51CA4C172B0E5D8&t=544x310"
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
              Have you decided to move to the cloud? Are you not sure which of Sitecore's SaaS products will give you
              what you already have? Find the resources you need to migrate to our new SaaS DXP from Sitecore's
              traditional platform products like Experience Manager (XM), Experience Platform (XP), and Experience
              Commerce (XC).
            </Text>
          </Stack>
          <Grid
            templateColumns={{ base: `repeat(2}, 1fr)`, md: `repeat(4, 1fr)`, lg: `repeat(4, 1fr)` }}
            gap={6}
            alignItems={'items-stretch'}
            mt={12}
            pb={12}
          >
            {features.map((feature) => (
              <FeatureCard heading={feature.heading} text={feature.text} />
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
    text: 'Tell us about which features you use in your existing Sitecore Platform DXP installation.',
  },
  {
    heading: 'Step 2: Get Recommendations',
    text: 'Receive personalized product recommendations that can give you the features you are using today.',
  },
  {
    heading: 'Step 3: Find Helpful Content',
    text: 'Find a collection of curated migration content created by Sitecore and the community, personalized to your context.',
  },
  {
    heading: 'Step 4: Connect for more updates!',
    text: 'Sign up for the email list to be notified of new content and updates as we add to the application.',
  },
];
