import { Badge, Grid, Group, Paper, Stack } from '@mantine/core';
import { Outcome } from 'components/Outcome/Outcome';
import { IAnswer, ITheme } from 'models/Definitions';
import { FC } from 'react';

interface OutcomePanelProps {
  answers: IAnswer[];
  theme?: ITheme;
}

export const OutcomePanel: FC<OutcomePanelProps> = ({ theme, answers }) => {
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
                Theme Here
              </Badge>
              <Badge color="orange" variant="dot">
                Persona Needed
              </Badge>
            </Group>
          </Grid.Col>
        </Grid>
        <Outcome answers={answers} />
      </Stack>
    </Paper>
  );
};
