import { AbsoluteCenter, Avatar, Box, Center, Heading, Stack, VStack } from '@chakra-ui/react';
import { OutcomeGenerator } from 'components/Outcomes';
import { PreviousAnswers } from 'components/Prompts';
import { HexagonCollection, TwoColumnLayout, useGameInfoContext } from 'components/ui';
import router from 'next/router';
import { FC } from 'react';

interface OutcomePanelProps {}

export const OutcomePanel: FC<OutcomePanelProps> = () => {
  const gameInfoContext = useGameInfoContext();

  if (process.browser) {
    if (gameInfoContext.answers === undefined || gameInfoContext.answers.length === 0) {
      if (!(typeof window === undefined)) {
        window.history.pushState(null, '', '/');
        window.location.reload();
      } else {
        router.push('/');
      }
    }
  }

  return (
    <TwoColumnLayout
      leftColumn={
        <Center>
          <Stack direction={{ base: 'row', lg: 'column' }}>
            {gameInfoContext.avatar?.fileUrl !== undefined && gameInfoContext?.persona !== undefined && (
              <VStack mb={8}>
                <Avatar width="200px" height="200px" src={gameInfoContext.avatar?.fileUrl} name="User Avatar" />
                <Box
                  backgroundColor="white"
                  width="100%"
                  height="40px"
                  position="relative"
                  boxShadow="0 8px 16px 0 rgba(84,88,89,.4)"
                >
                  <AbsoluteCenter axis="both">
                    <Heading size="md">{gameInfoContext?.persona.name}</Heading>
                  </AbsoluteCenter>
                </Box>
              </VStack>
            )}
            <HexagonCollection />
          </Stack>
        </Center>
      }
      rightColumn={
        <Box
          w="100%"
          mt={8}
          mb={4}
          p={8}
          bg="#C8C8C8"
          boxShadow="0 0 10px 0 rgba(0,0,0,.2), inset 0 0 200px hsla(0,0%,100%,.3)"
          borderRadius="lg"
          display="flex"
          alignItems="center"
          flexDirection="column"
        >
          <Stack>
            <OutcomeGenerator />
            <PreviousAnswers />
          </Stack>
        </Box>
      }
    ></TwoColumnLayout>
  );
};
