import { Center, Container } from '@mantine/core';
import { AuthModal, GameInfoContext, GameInfoContextType, Loading, Settings } from 'components/ui';
import React, { useContext, useEffect } from 'react';

const App = () => {
  const gameInfoContext = useContext<GameInfoContextType>(GameInfoContext);
  const [loading, setLoading] = React.useState(true);
  const [authModelOpen, setAuthModalOpen] = React.useState(false);
  const [settingModalOpen, setSettingModalOpen] = React.useState(true);

  useEffect(() => {
    initializeApp().catch((e) => console.error(e));
    // eslint-disable-next-line
  }, []);

  const initializeApp = async () => {
    // Should maybe preload themes and personas here
    setLoading(false);
  };

  return (
    <Container my="sm" size="sm" className="App">
      {!loading ? (
        <>
          <AuthModal isOpen={authModelOpen} onClose={() => setAuthModalOpen(false)}></AuthModal>
          <Container my="sm" size="sm" className="App">
            <Settings />
          </Container>
        </>
      ) : (
        <>
          <Center>
            <Loading message="Loading Game Configuration..." />
          </Center>
        </>
      )}
    </Container>
  );
};

export default App;
