import { Button, Center, Container, useBoolean } from '@chakra-ui/react';
import { useEngageTracker, useGameInfoContext } from 'components/Contexts';
import { AvatarGallery, Loading, PersonaList, ThemeList } from 'components/ui';
import * as GTag from 'lib/GTag';
import { OutcomeService } from 'lib/OutcomeService';
import { PersonaService } from 'lib/PersonaService';
import { ThemeService } from 'lib/ThemeService';
import { IImage, IOutcome, IPersona, ITheme } from 'models';
import router from 'next/router';
import { FC, useCallback, useEffect, useState } from 'react';

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
  const [toggledButton, setToggledButton] = useState<string>();
  const [toggledAvatar, setToggledAvatar] = useState<IImage>();
  const [loading, setLoading] = useBoolean(false);
  const themeService = ThemeService();
  const personaService = PersonaService();
  const outcomeService = OutcomeService();
  //#endregion

  const initializeSettings = useCallback(async () => {
    setLoading.on;

    const data = await themeService.GetAllThemes();

    if (data?.results !== undefined) {
      setThemes(data.results);
    }

    setLoading.off;
  }, []);

  useEffect(() => {
    initializeSettings();

    tracker.TrackPageView({ page: '/settings', channel: 'WEB', currency: 'USD', language: 'EN' });
  }, [initializeSettings]);

  //#region Functions
  const handleSettingChange = async (newTheme: string) => {
    setLoading.on;
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
    setLoading.off;
  };

  const handlePersonaChange = async (newPersona: string) => {
    await tracker.TrackEvent('PERSONA_CHANGE', { persona: newPersona });
    GTag.event('persona_change', 'Persona', newPersona);

    setToggledButton(newPersona);
  };

  const handleAvatarChange = async (newAvatar: IImage) => {
    await tracker.TrackEvent('AVATAR_CHANGE', { avatar: newAvatar.id });
    GTag.event('avatar_change', 'Avatar', newAvatar.id);

    setToggledAvatar(newAvatar);
  };

  const handleStartGame = async () => {
    await gameInfoContext.updatePersona(toggledButton as string);
    await gameInfoContext.updateAvatar(toggledAvatar as IImage);

    router.push('/prompt');
  };
  //#endregion

  return (
    <Container w="100%" maxWidth={'1136px'} rounded={'lg'} padding={{ sm: 0, md: 10 }}>
      {loading ? (
        <>
          <Center>
            <Loading message="Loading settings..." />
          </Center>
        </>
      ) : (
        <>
          {showCharacterOptions ? (
            <>
              <PersonaList
                personas={personas}
                toggledButtonId={toggledButton}
                handlePersonaChange={handlePersonaChange}
                classStyles={null}
              />
              <AvatarGallery
                avatars={avatars}
                toggledAvatarId={toggledAvatar?.id}
                handleAvatarChange={handleAvatarChange}
              />
              <Center>
                <Button
                  margin={10}
                  variant={'solid'}
                  size={'lg'}
                  isDisabled={toggledAvatar == undefined || toggledButton == undefined}
                  onClick={() => handleStartGame()}
                >
                  {gameInfoContext.theme?.startButtonText ?? 'Save Changes and Start Adventure'}
                </Button>
              </Center>
            </>
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
