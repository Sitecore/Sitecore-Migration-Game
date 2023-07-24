import { PromptPanel } from 'components/Prompts';
import { Layout } from 'components/ui';

const PromptPage = () => {
  return (
    <Layout showSaveButton={false}>
      <PromptPanel />
    </Layout>
  );
};

export default PromptPage;
