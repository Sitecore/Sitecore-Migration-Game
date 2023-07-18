import { OutcomePanel } from 'components/Outcomes';
import { Layout } from 'components/ui';

interface OutcomePageProps {}

const OutcomePage: React.FC<OutcomePageProps> = () => {
  return (
    <Layout showProgressBar={false} showSaveButton={false}>
      <OutcomePanel />
    </Layout>
  );
};

export default OutcomePage;
