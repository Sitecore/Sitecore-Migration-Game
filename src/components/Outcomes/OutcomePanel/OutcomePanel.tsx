import { Badge, Grid, Group, Paper, Stack } from '@mantine/core';
import { OutcomeGenerator } from 'components/Outcomes';
import { PreviousAnswers } from 'components/Prompts';
import { useGameInfoContext } from 'components/ui';
import { FC } from 'react';

interface OutcomePanelProps {}

export const OutcomePanel: FC<OutcomePanelProps> = () => {
  const gameInfoContext = useGameInfoContext();

  return (
    <Paper p="md" shadow="xs" withBorder>
      <Stack>
        <Grid justify="flex-end">
          <Grid.Col span={6}>
            <Badge color="green">Solution</Badge>
          </Grid.Col>
          <Grid.Col span={6}>
            <Group position="right" spacing="xs">
              <Badge color="orange" variant="dot">
                {gameInfoContext.theme}
              </Badge>
              <Badge color="orange" variant="dot">
                {gameInfoContext.persona}
              </Badge>
            </Group>
          </Grid.Col>
        </Grid>
        <OutcomeGenerator />
        <PreviousAnswers />
      </Stack>
    </Paper>
  );
};
