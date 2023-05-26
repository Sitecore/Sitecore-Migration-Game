import { Badge, Grid, Group, Paper, Stack } from '@mantine/core';
import { GameInfoContext, GameInfoContextType } from 'components/GameInfoContext/GameInfoContext';
import { MarkdownDisplay } from 'components/MarkdownDisplay/MarkdownDisplay';
import { Outcome } from 'components/Outcome/Outcome';
import { OutcomeGenerator } from 'components/OutcomeGenerator/OutcomeGenerator';
import { PreviousAnswers } from 'components/PreviousAnswers/PreviousAnswers';
import { FC, useContext } from 'react';

interface OutcomePanelProps {}

export const OutcomePanel: FC<OutcomePanelProps> = () => {
  const gameInfoContext = useContext<GameInfoContextType>(GameInfoContext);

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
