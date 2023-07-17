import { Box, Progress } from '@chakra-ui/react';
import { FC, useCallback, useEffect, useState } from 'react';
import { useGameInfoContext } from '..';

interface ProgressTrackerProps {}

export const ProgressTracker: FC<ProgressTrackerProps> = () => {
  const gameInfoContext = useGameInfoContext();
  const [progress, setProgress] = useState<number>(0);

  //TODO: Get Questions in Queue
  const calculateProgress = useCallback(() => {
    setProgress(60);
  }, [gameInfoContext.answers]);

  useEffect(() => {
    calculateProgress();
  }, [calculateProgress]);

  return (
    <>
      <Box>
        <Progress
          colorScheme="green"
          value={progress}
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
