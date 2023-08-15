import { Avatar, AvatarGroup, Badge, Grid, GridItem, Text } from '@chakra-ui/react';
import { useGameInfoContext } from 'components/Contexts';
import { IPrompt } from 'models';
import { FC } from 'react';

interface InfoBarProps {
  remainingQuestions: IPrompt[];
  isSolution?: boolean;
}

export const InfoBar: FC<InfoBarProps> = ({ remainingQuestions, isSolution = false }) => {
  const gameInfoContext = useGameInfoContext();

  return (
    <Grid>
      <GridItem colSpan={6}>
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
      </GridItem>
      <GridItem colSpan={6}>
        {gameInfoContext.theme?.characterImage?.results !== undefined && (
          <AvatarGroup spacing="xs">
            <Avatar
              size={'xl'}
              src={gameInfoContext.theme.characterImage!.results[0].fileUrl}
              title={gameInfoContext.theme.characterImage!.results[0].fileName ?? ''}
            />
            <div style={{ flex: 1 }}>
              <Text>{gameInfoContext.theme.name}</Text>
            </div>
          </AvatarGroup>
        )}
        {gameInfoContext.persona !== undefined && gameInfoContext.avatar !== undefined && (
          <AvatarGroup spacing="xs">
            <Avatar size="xl" src={gameInfoContext.avatar?.fileUrl} title={gameInfoContext.avatar?.fileName ?? ''} />
            <div style={{ flex: 1 }}>
              <Text size="sm" fontWeight={500}>
                {gameInfoContext.persona.name}
              </Text>
            </div>
          </AvatarGroup>
        )}
      </GridItem>
    </Grid>
  );
};
