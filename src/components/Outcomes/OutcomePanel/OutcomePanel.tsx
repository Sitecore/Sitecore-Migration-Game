import { Box, Center, Stack } from '@chakra-ui/react';
import { useEngageTracker, useGameInfoContext } from 'components/Contexts';
import { OutcomeGenerator } from 'components/Outcomes';
import { PreviousAnswers } from 'components/Prompts';
import { HexagonCollection, TwoColumnLayout } from 'components/ui';
import AvatarDisplay from 'components/ui/AvatarDisplay/AvatarDisplay';
import router from 'next/router';
import { FC, useEffect } from 'react';

interface OutcomePanelProps {}

export const OutcomePanel: FC<OutcomePanelProps> = () => {
  const gameInfoContext = useGameInfoContext();
  const tracker = useEngageTracker();

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

  useEffect(() => {
    tracker.TrackPageView({ page: '/outcome', channel: 'WEB', language: 'EN', currency: 'USD' });
  }, []);

  return (
    <TwoColumnLayout
      leftColumn={
        <Center>
          <Stack direction={{ base: 'row', lg: 'column' }} gap={{ base: 20, lg: 0 }}>
            {gameInfoContext.avatar?.fileUrl !== undefined && gameInfoContext?.persona !== undefined && (
              <AvatarDisplay fileUrl={gameInfoContext.avatar?.fileUrl} name={gameInfoContext?.persona.name} />
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
