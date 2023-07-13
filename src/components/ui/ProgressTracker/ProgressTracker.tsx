import { Progress } from "@chakra-ui/react";
import { FC } from "react";
import { useGameInfoContext } from "..";

interface ProgressTrackerProps {
  
}

export const ProgressTracker: FC<ProgressTrackerProps> = () => {
  const gameInfoContext = useGameInfoContext();

  return (
    <>
    <Progress colorScheme="green" value={60} />
    </>
  )
}