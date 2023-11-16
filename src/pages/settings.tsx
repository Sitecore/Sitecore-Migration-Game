import { useGameInfoContext } from 'components/Contexts';
import { AuthModal, Settings, SingleColumnLayout } from 'components/ui';
import React from 'react';

const SettingsPage = () => {
  const [authModelOpen, setAuthModalOpen] = React.useState(false);
  const gameInfoContext = useGameInfoContext();

  return (
    <>
      <AuthModal isOpen={false} onClose={() => setAuthModalOpen(false)}></AuthModal>
      <SingleColumnLayout
        showProgressBar={false}
        showSaveButton={false}
        showResetButton={false}
        showFeedbackButton={true}
        backgroundImage={
          gameInfoContext.theme?.chakraTheme == 'fantasy'
            ? 'https://mms-delivery.sitecorecloud.io/api/media/v2/delivery/df4c80ea-db67-49f8-bcd3-08daadeee4f5/182bc6d196aa465cbf9b614ff2883eb4'
            : '/corporate/XM-cloud-3d-logo-hero.jpg'
        }
      >
        <Settings />
      </SingleColumnLayout>
    </>
  );
};

export default SettingsPage;
