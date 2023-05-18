import { Center, Container } from '@mantine/core';
import { AuthModal } from 'components/AuthModal/AuthModal';
import { Navigation } from 'components/Navigation/Navigation';
import { SettingModal } from 'components/SettingModal/SettingModal';
import { Loading } from 'components/ui/Loading/Loading';
import { useTrait } from 'hooks/useTrait';
import router from 'next/router';
import React, { useEffect } from 'react';

const App = () => {
  const theme = useTrait<string>('corporate');
  const [persona, setPersona] = React.useState('nMeJvakIB0Kvx29f5uVdiw'); // Hard coding to Developer Persona until we complete Personas :-)

  const [loading, setLoading] = React.useState(true);
  const [authModelOpen, setAuthModalOpen] = React.useState(false);
  const [settingModalOpen, setSettingModalOpen] = React.useState(true);
  const [showResult, setShowResult] = React.useState(false);

  const [showQuestions, setShowQuestions] = React.useState(true);

  useEffect(() => {
    initializeApp().catch((e) => console.error(e));
    // eslint-disable-next-line
  }, []);

  const initializeApp = async () => {
    // Should maybe preload themes and personas here
    setLoading(false);
  };

  const initializeResult = async () => {
    setShowResult(true);
    setShowQuestions(false);
  };

  const handleSettingChange = async (newTheme: string) => {
    theme.set('-e_W0k2zO0uZPNBmYtorCQ');
    setSettingModalOpen(false);
    router.push('/prompt');
  };

  return (
    <Container my="sm" size="sm" className="App">
      {!loading ? (
        <>
          <Navigation saveTrigger={() => setAuthModalOpen(true)} settingTrigger={() => setSettingModalOpen(true)} />
          <AuthModal isOpen={authModelOpen} onClose={() => setAuthModalOpen(false)}></AuthModal>
          <SettingModal isOpen={settingModalOpen} onClose={(newTheme: string) => handleSettingChange(newTheme)} />\
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
