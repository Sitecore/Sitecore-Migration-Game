import { Container } from '@mantine/core';
import { PromptPanel } from 'components/Prompts';
import { Navigation } from 'components/ui';

const PromptPage = () => {
  return (
    <Container my="sm" size="sm" className="App">
      <Navigation showRestartButton={false} />
      <PromptPanel />
    </Container>
  );
};

export default PromptPage;
