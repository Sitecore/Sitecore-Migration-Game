import { Paper, Stack } from '@mantine/core';
import { OutcomeGenerator } from 'components/Outcomes';
import { PreviousAnswers } from 'components/Prompts';
import { InfoBar, useGameInfoContext } from 'components/ui';
import { FC } from 'react';

interface OutcomePanelProps {}

export const OutcomePanel: FC<OutcomePanelProps> = () => {
  const gameInfoContext = useGameInfoContext();

  return (
    <Paper p="md" shadow="xs" withBorder>
      <Stack>
        <InfoBar remainingQuestions={[]} />
        <OutcomeGenerator />
        <PreviousAnswers />
      </Stack>
    </Paper>
  );
};
