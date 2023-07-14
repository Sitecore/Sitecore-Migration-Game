import { Box, Progress } from '@chakra-ui/react';
import { FC } from 'react';
import { useGameInfoContext } from '..';

interface ProgressTrackerProps {}

export const ProgressTracker: FC<ProgressTrackerProps> = () => {
  const gameInfoContext = useGameInfoContext();

  return (
    <>
      <Box>
        <Progress
          colorScheme="green"
          value={60}
          backgroundColor="green.200"
          width="80%"
          border="1px"
          borderColor="green.500"
          size="lg"
        />
      </Box>
    </>
  );
};
