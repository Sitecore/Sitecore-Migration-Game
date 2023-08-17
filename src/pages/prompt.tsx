import { PromptPanel } from 'components/Prompts';
import { Layout } from 'components/ui';

const PromptPage = () => {
  return (
    <Layout>
      <PromptPanel showSaveButton={false} />
    </Layout>
  );
};

export default PromptPage;
