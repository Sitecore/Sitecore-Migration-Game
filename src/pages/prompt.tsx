import { Container } from '@mantine/core';
import { Navigation } from 'components/Navigation/Navigation';
import { PromptPanel } from 'components/Panels/PromptPanel';

const PromptPage = () => {
  return (
    <Container my="sm" size="sm" className="App">
      <Navigation />
      <PromptPanel />
    </Container>
  );
};

export default PromptPage;
