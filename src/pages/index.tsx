import { AuthModal, Settings, SingleColumnLayout } from 'components/ui';
import React from 'react';

const App = () => {
  const [authModelOpen, setAuthModalOpen] = React.useState(false);

  return (
    <>
      <AuthModal isOpen={authModelOpen} onClose={() => setAuthModalOpen(false)}></AuthModal>
      <SingleColumnLayout showProgressBar={false} showSaveButton={false} showResetButton={false}>
        <Settings />
      </SingleColumnLayout>
    </>
  );
};

export default App;
