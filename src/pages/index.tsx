import { useGameInfoContext } from 'components/Contexts';
import { AuthModal, Settings, SingleColumnLayout } from 'components/ui';
import React from 'react';

const App = () => {
  const [authModelOpen, setAuthModalOpen] = React.useState(false);
  const gameInfoContext = useGameInfoContext();

  return (
    <>
      <AuthModal isOpen={false} onClose={() => setAuthModalOpen(false)}></AuthModal>
      <SingleColumnLayout showProgressBar={false} showSaveButton={false} showResetButton={false}>
        <Settings />
      </SingleColumnLayout>
    </>
  );
};

export default App;
