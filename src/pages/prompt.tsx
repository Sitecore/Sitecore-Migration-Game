import { PromptPanel } from 'components/Prompts';
import { Layout } from 'components/ui';

const PromptPage = () => {
  return (
    <Layout>
      <PromptPanel showSaveButton={false} showFeedbackButton={true} />
    </Layout>
  );
};

export default PromptPage;
