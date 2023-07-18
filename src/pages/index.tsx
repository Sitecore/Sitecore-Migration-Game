import { AuthModal, Layout, Settings, SingleColumnLayout } from 'components/ui';
import React from 'react';

const App = () => {
  const [authModelOpen, setAuthModalOpen] = React.useState(false);

  return (
    <Layout showProgressBar={false} showResetButton={false} showSaveButton={false}>
      <>
        <AuthModal isOpen={authModelOpen} onClose={() => setAuthModalOpen(false)}></AuthModal>
        <SingleColumnLayout>
          <Settings />
        </SingleColumnLayout>
      </>
    </Layout>
  );
};

export default App;
