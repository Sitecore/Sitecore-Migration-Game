import { Center, Container } from '@mantine/core';
import { AuthModal } from 'components/AuthModal/AuthModal';
import { GameInfoContext, GameInfoContextType } from 'components/GameInfoContext/GameInfoContext';
import { Navigation } from 'components/Navigation/Navigation';
import { SettingModal } from 'components/SettingModal/SettingModal';
import { Loading } from 'components/ui/Loading/Loading';
import router from 'next/router';
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
          <SettingModal isOpen={settingModalOpen} />
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
