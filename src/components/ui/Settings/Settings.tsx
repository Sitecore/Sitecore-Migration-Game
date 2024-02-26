import { Container } from '@chakra-ui/react';
import { useEngageTracker, useGameInfoContext } from 'components/Contexts';
import { Loading } from 'components/ui';
import { OutcomeService } from 'lib/OutcomeService';
import { PersonaService } from 'lib/PersonaService';
import { ThemeService } from 'lib/ThemeService';
import { IImage, IPersona, ITheme } from 'models';
import { FC, useCallback, useEffect, useState } from 'react';
import { ChooseCharacter } from '../ChooseCharacterDisplay/ChooseCharacter';

interface SettingsProps {}

//#endregion

export const Settings: FC<SettingsProps> = () => {
  //#region State/Props
  const gameInfoContext = useGameInfoContext();
  const tracker = useEngageTracker();

  const [themes, setThemes] = useState<ITheme[] | undefined>();
  const [personas, setPersonas] = useState<IPersona[] | undefined>();
  const [avatars, setAvatars] = useState<IImage[] | undefined>();
  const [loading, setLoading] = useState<Boolean>(false);
  const themeService = ThemeService();
  const personaService = PersonaService();
  const outcomeService = OutcomeService();
  //#endregion

  const initializeSettings = useCallback(async () => {
    setLoading(true);

    const data = await themeService.GetAllThemes();
    const themes = data?.results !== undefined ? data.results.filter((t) => t.disabled != true) : undefined;

    if (themes && themes.length > 0) {
      setThemes(themes);
    } else {
      throw new Error('No themes loaded. At least one theme is required.');
    }

    setLoading(false);

    //After loading theme data, skip theme selection if there are no other themes.
    if (themes?.length == 1) {
    handleSettingChange(themes[0].id);
    }
  }, []);

  useEffect(() => {
    initializeSettings();

    tracker.TrackPageView({ page: '/settings', channel: 'WEB', currency: 'USD', language: 'EN' });
  }, [initializeSettings]);

  const handleSettingChange = async (newTheme: string) => {
    setLoading(true);

    // Load Personas
    const data = await personaService.GetPersonas();

    if (data?.results !== undefined) {
      setPersonas(data.results);
    }

    //Load avatars
    const themeData = await themeService.GetThemeById(newTheme);
    if (themeData?.avatarGallery?.results != undefined) {
      setAvatars(themeData.avatarGallery?.results);
    }

    setLoading(false);
  };

  return (
    <Container w="100%" maxWidth={'1136px'} rounded={'lg'} padding={{ sm: 0, md: 10 }}>
      {loading == true ? (
        <>
          <Loading message="Loading settings..." />
        </>
      ) : (            
        <ChooseCharacter avatars={avatars} personas={personas} />
      )}
    </Container>
  );
};
