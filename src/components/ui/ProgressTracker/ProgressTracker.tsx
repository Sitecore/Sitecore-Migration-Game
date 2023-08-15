import { Container, Progress } from '@chakra-ui/react';
import { useGameInfoContext } from 'components/Contexts';
import { FC, useCallback, useEffect, useState } from 'react';

interface ProgressTrackerProps {}

export const ProgressTracker: FC<ProgressTrackerProps> = () => {
  const gameInfoContext = useGameInfoContext();
  const [progress, setProgress] = useState<number>(0);

  const calculateProgress = useCallback(() => {
    let questionsRemaining = 0;
    let questionsAnswered = gameInfoContext.answers!.length;
    if (gameInfoContext.questionsBank?.get() !== undefined) {
      questionsRemaining = gameInfoContext.questionsBank.get()!.length + 1;
    }
    let totalQuestions = questionsAnswered + questionsRemaining;

    if (totalQuestions == 1 && questionsRemaining == 1) {
      setProgress(5);
    } else if (questionsRemaining == 0) {
      setProgress(100);
    } else {
      setProgress(((totalQuestions - questionsRemaining) / totalQuestions) * 100);
    }
  }, [gameInfoContext.answers, gameInfoContext.questionsBank.get()]);

  useEffect(() => {
    calculateProgress();
  }, [calculateProgress]);

  return (
    <>
      <Container variant="progressBar">
        <Progress
          value={progress}
          width="100%"
          height={'13px'}
          size="lg"
          variant={'progressBar'}
          background={gameInfoContext.theme?.chakraTheme == 'fantasy' ? 'transparent' : 'white'}
        />
      </Container>
    </>
  );
};
