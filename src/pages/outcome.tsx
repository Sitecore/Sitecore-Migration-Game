import { Container } from '@mantine/core';
import { GameInfoContext, GameInfoContextType } from 'components/GameInfoContext/GameInfoContext';
import { Navigation } from 'components/Navigation/Navigation';
import { OutcomePanel } from 'components/Panels';
import { useContext } from 'react';

interface OutcomePageProps {}

const OutcomePage: React.FC<OutcomePageProps> = () => {
  const gameInfoContext = useContext<GameInfoContextType>(GameInfoContext);

  return (
    <Container my="sm" size="sm" className="App">
      <Navigation />
      <OutcomePanel answers={gameInfoContext.answers}></OutcomePanel>
    </Container>
  );
};

export default OutcomePage;
