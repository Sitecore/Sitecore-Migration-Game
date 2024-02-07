import { Settings, SingleColumnLayout, useThemeSwitcher } from 'components/ui';
import React from 'react';

const SettingsPage = () => {
  const themeSwitcher = useThemeSwitcher();

  return (
    <>
      <SingleColumnLayout
        showProgressBar={false}
        showSaveButton={false}
        showResetButton={false}
        showFeedbackButton={true}
        backgroundImage={
          themeSwitcher.currentTheme == 'fantasy'
            ? 'https://mms-delivery.sitecorecloud.io/api/media/v2/delivery/df4c80ea-db67-49f8-bcd3-08daadeee4f5/182bc6d196aa465cbf9b614ff2883eb4'
            : 'https://mms-delivery.sitecorecloud.io/api/media/v2/delivery/df4c80ea-db67-49f8-bcd3-08daadeee4f5/1821f8838e284d6fad1d483d41877aba'
        }
      >
        <Settings />
      </SingleColumnLayout>
    </>
  );
};

export default SettingsPage;
