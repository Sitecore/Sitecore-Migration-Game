import { Avatar, Badge, Grid, Group, Text } from '@mantine/core';
import { IPrompt } from 'models';
import { FC } from 'react';
import { useGameInfoContext } from '..';

interface InfoBarProps {
  remainingQuestions: IPrompt[];
  isSolution?: boolean;
}

export const InfoBar: FC<InfoBarProps> = ({ remainingQuestions, isSolution = false }) => {
  const gameInfoContext = useGameInfoContext();

  return (
    <Grid justify="flex-end">
      <Grid.Col span={6}>
        {isSolution ? (
          <>
            <Badge color="green">Solution</Badge>
          </>
        ) : (
          <>
            <Badge color="sitecoreRed">
              <Text>Remaining Questions: {remainingQuestions.length + 1}</Text>
            </Badge>
          </>
        )}
      </Grid.Col>
      <Grid.Col span={6}>
        <Group position="right" spacing="xs">
          {gameInfoContext.theme?.characterImage?.results !== undefined && (
            <Group>
              <Avatar
                radius="xl"
                src={gameInfoContext.theme.characterImage!.results[0].fileUrl}
                alt={gameInfoContext.theme.characterImage!.results[0].fileName ?? ''}
              />
              <div style={{ flex: 1 }}>
                <Text size="sm" weight={500}>
                  {gameInfoContext.theme.name}
                </Text>
              </div>
            </Group>
          )}
          {gameInfoContext.avatar !== undefined && (
            <Group position="right" spacing="xs">
              <Avatar radius="xl" src={gameInfoContext.avatar?.fileUrl} alt={gameInfoContext.avatar?.fileName ?? ''} />
              <div style={{ flex: 1 }}>
                <Text size="sm" weight={500}>
                  {gameInfoContext.persona.name}
                </Text>
              </div>
            </Group>
          )}
        </Group>
      </Grid.Col>
    </Grid>
  );
};
