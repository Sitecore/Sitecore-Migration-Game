import { Container } from '@mantine/core';
import { Navigation } from 'components/Navigation/Navigation';
import { OutcomePanel } from 'components/Panels';

interface OutcomePageProps {}

const OutcomePage: React.FC<OutcomePageProps> = () => {
  return (
    <Container my="sm" size="sm" className="App">
      <Navigation />
      <OutcomePanel />
    </Container>
  );
};

export default OutcomePage;
