import { Container } from '@mantine/core';
import { OutcomePanel } from 'components/Outcomes';
import { Navigation } from 'components/ui';

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
