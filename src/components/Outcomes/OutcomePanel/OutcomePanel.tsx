import { Card, Center, Stack } from '@chakra-ui/react';
import { useEngageTracker, useGameInfoContext } from 'components/Contexts';
import { OutcomeGenerator } from 'components/Outcomes';
import { HexagonCollection, LayoutProps, TwoColumnLayout } from 'components/ui';
import AvatarDisplay from 'components/ui/AvatarDisplay/AvatarDisplay';
import { FeedbackModal } from 'components/ui/FeedbackModal/FeedbackModal';
import { useRouter } from 'next/router';
import { FC } from 'react';

interface OutcomePanelProps extends LayoutProps {}

export const OutcomePanel: FC<OutcomePanelProps> = (props) => {
  const router = useRouter();
  const gameInfoContext = useGameInfoContext();
  const tracker = useEngageTracker();

  return (
    <>
      <FeedbackModal />
      <TwoColumnLayout
        showProgressBar={props.showProgressBar}
        showResetButton={props.showResetButton}
        showSaveButton={props.showSaveButton}
        showFeedbackButton={props.showFeedbackButton}
        backgroundImage={
          gameInfoContext.theme?.chakraTheme == 'fantasy'
            ? 'https://mms-delivery.sitecorecloud.io/api/media/v2/delivery/df4c80ea-db67-49f8-bcd3-08daadeee4f5/182bc6d196aa465cbf9b614ff2883eb4'
            : 'https://mms-delivery.sitecorecloud.io/api/media/v2/delivery/df4c80ea-db67-49f8-bcd3-08daadeee4f5/1821f8838e284d6fad1d483d41877aba'
        }
        leftColumn={
          <Center>
            <Stack direction={{ base: 'row', md: 'column' }} gap={{ base: 20, lg: 0 }}>
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
            </Stack>
          </Card>
        }
      ></TwoColumnLayout>
    </>
  );
};
