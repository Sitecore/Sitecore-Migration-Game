import { Container } from '@chakra-ui/react';
import { useEngageTracker, useGameInfoContext } from 'components/Contexts';
import { Loading, ThemeList } from 'components/ui';
import * as GTag from 'lib/GTag';
import { OutcomeService } from 'lib/OutcomeService';
import { PersonaService } from 'lib/PersonaService';
import { ThemeService } from 'lib/ThemeService';
import { IImage, IOutcome, IPersona, ITheme } from 'models';
import { FC, useCallback, useEffect, useState } from 'react';
import { ChooseCharacter } from '../ChooseCharacterDisplay/ChooseCharacter';

interface SettingsProps {}

//#endregion

export const Settings: FC<SettingsProps> = () => {
  //#region State/Props
  const gameInfoContext = useGameInfoContext();
  const tracker = useEngageTracker();

  const [showCharacterOptions, setShowCharacterOptions] = useState<Boolean>(false);
  const [themes, setThemes] = useState<ITheme[] | undefined>();
  const [personas, setPersonas] = useState<IPersona[] | undefined>();
  const [outcomes, setOutcomes] = useState<IOutcome[] | undefined>();
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
    await gameInfoContext.updateTheme(newTheme);

    await tracker.TrackEvent('THEME_CHANGE', { theme: newTheme });
    GTag.event('theme_change', 'Theme', newTheme);

    // Load Personas
    const data = await personaService.GetPersonasByTheme(newTheme);

    if (data?.results !== undefined) {
      setPersonas(data.results);
    }

    // Load Outcome content
    // TODO: I'm not sure this belongs at this point in the app, shouldn't this load when the outcome page loads?
    const outcomeData = await outcomeService.GetOutcomeByTheme(newTheme);
    if (outcomeData?.results !== undefined) {
      setOutcomes(outcomeData.results);
    }

    //Load avatars
    const themeData = await themeService.GetThemeById(newTheme);
    if (themeData?.avatarGallery?.results != undefined) {
      setAvatars(themeData.avatarGallery?.results);
    }

    setShowCharacterOptions(true);
    setLoading(false);
  };

  return (
    <Container w="100%" maxWidth={'1136px'} rounded={'lg'} padding={{ sm: 0, md: 10 }}>
      {loading == true ? (
        <>
          <Loading message="Loading settings..." />
        </>
      ) : (
        <>
          {showCharacterOptions ? (
            <ChooseCharacter avatars={avatars} personas={personas} />
          ) : (
            <>
              <ThemeList themes={themes} handleThemeChange={handleSettingChange} classStyles={null} />
            </>
          )}
        </>
      )}
    </Container>
  );
};
