import { OutcomePanel } from 'components/Outcomes';
import { Layout } from 'components/ui';

interface OutcomePageProps {}

const OutcomePage: React.FC<OutcomePageProps> = () => {
  return (
    <Layout>
      <OutcomePanel showProgressBar={false} showSaveButton={false} />
    </Layout>
  );
};

export default OutcomePage;
