import { Paper, Stack } from '@mantine/core';
import { OutcomeGenerator } from 'components/Outcomes';
import { PreviousAnswers } from 'components/Prompts';
import { InfoBar, useGameInfoContext } from 'components/ui';
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
    <Paper p="md" shadow="xs" withBorder>
      <Stack>
        <InfoBar remainingQuestions={[]} isSolution={true} />
        <OutcomeGenerator />
        <PreviousAnswers />
      </Stack>
    </Paper>
  );
};
