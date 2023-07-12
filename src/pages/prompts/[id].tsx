import {
  Avatar,
  Box,
  Center,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  SimpleGrid,
  Stack,
  VStack,
} from '@chakra-ui/react';
import { CurrentPrompt } from 'components/Prompts';
import { PromptService } from 'lib/PromptService';
import { IAnswer, IPrompt } from 'models';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';

interface PromptPageProps {
  prompt: IPrompt | undefined;
  gameInfoContext: any;
}

let promptService = PromptService();

const PromptPage: NextPage<PromptPageProps> = ({ prompt, gameInfoContext }) => {
  const answerSelected = (answer: IAnswer) => {};

  return (
    <>
      <Box
        position="relative"
        h="calc(100vh - 64px)"
        w="full"
        backgroundImage="/corporate/background.jpg"
        backgroundSize="cover"
      >
        <Center>
          <Container minW="container.lg">
            <Grid h="100%" w="100%" templateColumns={{ base: '1fr', lg: '1fr 2fr' }} gap={0}>
              <Flex justify="center" align="center">
                <GridItem>
                  <Center>
                    <Stack direction={{ base: 'row', lg: 'column' }}>
                      {gameInfoContext.persona?.personaImage?.results !== undefined && (
                        <VStack>
                          <Avatar
                            size="2xl"
                            src={gameInfoContext?.persona.personaImage!.results[0].fileUrl}
                            name={gameInfoContext.persona.personaImage!.results[0].fileName ?? ''}
                          />
                          <Heading size="lg">{gameInfoContext?.persona.name}</Heading>
                        </VStack>
                      )}
                      <SimpleGrid columns={3} spacing="2px">
                        <Box bg="lightgrey" height="50px" width="50px">
                          1
                        </Box>
                        <Box bg="lightgrey" height="50px" width="50px">
                          2
                        </Box>
                        <Box bg="lightgrey" height="50px" width="50px">
                          3
                        </Box>
                        <Box bg="lightgrey" height="50px" width="50px">
                          4
                        </Box>
                        <Box bg="lightgrey" height="50px" width="50px">
                          5
                        </Box>
                        <Box bg="lightgrey" height="50px" width="50px">
                          6
                        </Box>
                        <Box bg="lightgrey" height="50px" width="50px">
                          7
                        </Box>
                        <Box bg="lightgrey" height="50px" width="50px">
                          8
                        </Box>
                        <Box bg="lightgrey" height="50px" width="50px">
                          9
                        </Box>
                      </SimpleGrid>
                    </Stack>
                  </Center>
                </GridItem>
              </Flex>
              <Flex justify="center" align="center">
                <GridItem>
                  <CurrentPrompt prompt={prompt} answerSelected={answerSelected} />
                </GridItem>
              </Flex>
            </Grid>
          </Container>
        </Center>
      </Box>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as { id: string };

  let currentPrompt = await promptService.GetPromptById(id);

  return {
    props: {
      prompt: currentPrompt,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const results: string[] | null = await promptService.GetAllIdPrompts();

  if (results == null) {
    return {
      paths: [],
      fallback: false,
    };
  } else {
    const paths = results.map((id: string) => ({ params: { id: id } }));
    return {
      paths: paths,
      fallback: false,
    };
  }
};

export default PromptPage;
