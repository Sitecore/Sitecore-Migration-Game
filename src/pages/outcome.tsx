import { Container } from '@mantine/core';
import { OutcomePanel } from 'components/Outcomes';

interface OutcomePageProps {}

const OutcomePage: React.FC<OutcomePageProps> = () => {
  return (
    <Container my="sm" size="sm" className="App">
      <OutcomePanel />
    </Container>
  );
};

export default OutcomePage;
