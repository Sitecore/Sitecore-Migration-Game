import { PromptPanel } from 'components/Prompts';
import { Layout } from 'components/ui';

const PromptPage = () => {
  return (
    <Layout showSaveButton={false}>
      <PromptPanel showSaveButton={false} children={undefined} />
    </Layout>
  );
};

export default PromptPage;
