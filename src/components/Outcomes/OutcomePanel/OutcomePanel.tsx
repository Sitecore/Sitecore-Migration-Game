import { Card, Center, Stack } from '@chakra-ui/react';
import { useEngageTracker, useGameInfoContext } from 'components/Contexts';
import { OutcomeGenerator } from 'components/Outcomes';
import { PreviousAnswers } from 'components/Prompts';
import { HexagonCollection, LayoutProps, TwoColumnLayout } from 'components/ui';
import AvatarDisplay from 'components/ui/AvatarDisplay/AvatarDisplay';
import router from 'next/router';
import { FC, useEffect } from 'react';

interface OutcomePanelProps extends LayoutProps {}

export const OutcomePanel: FC<OutcomePanelProps> = (props) => {
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
      showProgressBar={props.showProgressBar}
      showResetButton={props.showResetButton}
      showSaveButton={props.showSaveButton}
      showFeedbackButton={props.showFeedbackButton}
      backgroundImage={
        gameInfoContext.theme?.chakraTheme == 'fantasy'
          ? 'https://mms-delivery.sitecorecloud.io/api/media/v2/delivery/df4c80ea-db67-49f8-bcd3-08daadeee4f5/182bc6d196aa465cbf9b614ff2883eb4'
          : '/corporate/background.jpg'
      }
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
        <Card w="100%" mt={8} mb={4} p={8} display="flex" alignItems="center" flexDirection="column">
          <Stack>
            <OutcomeGenerator />
            <PreviousAnswers />
          </Stack>
        </Card>
      }
    ></TwoColumnLayout>
  );
};
