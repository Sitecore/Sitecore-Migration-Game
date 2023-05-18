import { Container } from '@mantine/core';
import { Navigation } from 'components/Navigation/Navigation';
import { PromptPanel } from 'components/Panels/PromptPanel';

const PromptPage = () => {
  return (
    <Container my="sm" size="sm" className="App">
      <Navigation />
      <PromptPanel theme="-e_W0k2zO0uZPNBmYtorCQ" persona="nMeJvakIB0Kvx29f5uVdiw" />
    </Container>
  );
};

export default PromptPage;
