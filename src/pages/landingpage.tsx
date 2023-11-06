import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  Container,
  Flex,
  Grid,
  HStack,
  Heading,
  Icon,
  IconButton,
  Image,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Tooltip,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { mdiCircleHalfFull } from '@mdi/js';
import { Layout } from 'components/ui';
import Link from 'next/link';

const Landinpage: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Layout minHeight={'100vh'} px={{ sm: '4', md: '0' }}>
      <Box layerStyle="section.topbar" shadow={'base'}>
        <Flex h="14" align={'center'} justify="space-between">
          <HStack flexShrink={0}>
            <Link href="/">
              <Image
                p="1"
                h="8"
                w={[8, 8, 'auto']}
                fit="cover"
                align="left"
                alt={'Sitecore Migration Game'}
                src={useColorModeValue(
                  `https://sitecorecontenthub.stylelabs.cloud/api/public/content/01f247553f4b46498938733e41cb6ae4`,
                  `https://sitecorecontenthub.stylelabs.cloud/api/public/content/e88a7e8526914d60a7ac09162207c4e5`
                )}
              />
            </Link>
            <Badge colorScheme="primary" variant="outline">
              Migration Game
            </Badge>
          </HStack>
          <Stack direction={'row'} w="full" alignItems={'center'} px={4}></Stack>
          <ButtonGroup size="sm" variant="ghost">
            <Tooltip label={colorMode === 'light' ? 'Dark mode' : 'Light mode'}>
              <IconButton
                onClick={toggleColorMode}
                icon={
                  <Icon>
                    <path d={mdiCircleHalfFull} />
                  </Icon>
                }
                aria-label={colorMode === 'light' ? 'Dark mode' : 'Light mode'}
              />
            </Tooltip>
          </ButtonGroup>
        </Flex>
      </Box>

      <Stack gap={28} width={'full'} pb={10} pt={{ sm: 0, md: 28 }}>
        {/* Hero Banner */}
        <Container maxW={'5xl'}>
          <Stack align={'center'} spacing={{ base: 4, md: 8 }} direction={{ base: 'column-reverse', md: 'row' }}>
            <Stack flex={1} spacing={{ base: 2, md: 4 }} width={{ sm: 'full', md: '50%' }}>
              <Heading variant="section">Migration made easy</Heading>
              <Heading as={'h1'} size={'xl'}>
                Migrate You Software Seamlessly
              </Heading>
              <Text>Our tool ensure a smooth migration process with zero downtime. Move forward with confidence</Text>
              <HStack>
                <Button>Get Started</Button>
                <Button variant="outline">Learn More</Button>
              </HStack>
            </Stack>
            <Image src="/logo.jpg" alt="Sitecore Composable Game" borderRadius="md" />
          </Stack>
        </Container>
        {/* Features */}
        <Container maxW={'5xl'}>
          <Stack spacing={4} as={Container} maxW={'5xl'} textAlign={'center'}>
            <Heading>Short heading</Heading>
            <Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis obcaecati ut cupiditate pariatur,
              dignissimos, placeat amet officiis.
            </Text>
          </Stack>
          <Grid
            templateColumns={{ base: `repeat(2}, 1fr)`, md: `repeat(4, 1fr)`, lg: `repeat(4, 1fr)` }}
            gap={6}
            alignItems={'items-stretch'}
            mt={12}
          >
            {/* Use blank array to repeat feature boxes */}
            {Array.from({ length: 4 }).map((_, index) => (
              <Card key={index} layerStyle="interactive.fill" variant="outlineRaised" cursor="pointer">
                <CardBody>
                  <Heading size={'md'}>Feature title</Heading>
                  <Text my={4}>
                    Lorem ipsum dolor sit amet consectetur adipisicing obcaecati ut cupiditate pariatur.
                  </Text>
                </CardBody>
              </Card>
            ))}
          </Grid>
        </Container>

        <Container maxW={'5xl'}>
          <Stack spacing={4} as={Container} maxW={'5xl'} textAlign={'center'}>
            <Heading>How does it work?</Heading>
          </Stack>

          <Tabs variant="solid-rounded" isFitted colorScheme="primary" my={10}>
            <TabList mb={1}>
              <Tab>Choose your profile</Tab>
              <Tab>Answer questions</Tab>
              <Tab>Get recommendations</Tab>
            </TabList>
            <TabPanels textAlign={'center'}>
              <TabPanel>
                <Heading size="md" my={4}>
                  Choose your profile
                </Heading>
                <Image src="https://placehold.co/400x300" mx="auto" alt="Placholder image" />
                <Text my={6} mx={16}>
                  We have created a set of characters you can choose from to play the game.
                </Text>
              </TabPanel>
              <TabPanel>
                <Heading size="md" my={4}>
                  Answer questions
                </Heading>
                <Image src="https://placehold.co/400x300" mx="auto" alt="Placholder image" />
                <Text my={6} mx={16}>
                  To get a better understanding of your current implementation we will be asking a series of questions.
                  The questions are specific to your implementation.
                </Text>
              </TabPanel>
              <TabPanel>
                <Heading size="md" my={4}>
                  Get personalized recommendations
                </Heading>
                <Image src="https://placehold.co/400x300" mx="auto" alt="Placholder image" />
                <Text my={6} mx={16}>
                  Once we think we have a good understanding of your current implementation and requirements will are
                  able to provide you with recommendations. These recommendations will focus on specific products in our
                  Composable DXP and will provide you with further resources to learn more.
                </Text>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Container>
      </Stack>

      <Box p="4" bg="neutral-fg" textColor="chakra-inverse-text" bottom={0} position="absolute" width="full">
        <Text>© Copyright 2023, Sitecore. All Rights Reserved</Text>
      </Box>
    </Layout>
  );
};

export default Landinpage;
