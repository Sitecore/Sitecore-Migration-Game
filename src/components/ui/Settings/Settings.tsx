import { useBoolean } from '@chakra-ui/react';
import { Button, Center, Paper, createStyles, rem } from '@mantine/core';
import { AvatarGallery, Loading, PersonaList, ThemeList, useGameInfoContext } from 'components/ui';
import { OutcomeService } from 'lib/OutcomeService';
import { PersonaService } from 'lib/PersonaService';
import { ThemeService } from 'lib/ThemeService';
import { IImage, IOutcome, IPersona, ITheme } from 'models';
import router from 'next/router';
import { FC, useCallback, useEffect, useState } from 'react';

interface SettingsProps {}

//#region Styles
const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },
  highlightCard: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    boxShadow: '0 0 25px 5px #5548D9',
  },
  section: {
    borderBottom: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  like: {
    color: theme.colors.red[6],
  },

  avatarImage: {
    maxHeight: "315px",
    maxWidth: "315px",
  },

  label: {
    textTransform: 'uppercase',
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
}));
//#endregion

export const Settings: FC<SettingsProps> = () => {
  //#region State/Props
  const gameInfoContext = useGameInfoContext();
  const { classes } = useStyles();
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
  }, [initializeSettings]);

  //#region Functions
  const handleSettingChange = async (newTheme: string) => {
    setLoading.on;
    await gameInfoContext.updateTheme(newTheme);

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

  const handlePersonaChange = (newPersona: string) => {
    setToggledButton(newPersona);
  };

  const handleAvatarChange = (newAvatar: IImage) => {
    setToggledAvatar(newAvatar);
  };

  const handleStartGame = async () => {
    await gameInfoContext.updatePersona(toggledButton as string);
    await gameInfoContext.updateAvatar(toggledAvatar as IImage);

    router.push('/prompt');
  };
  //#endregion

  return (
    <Paper p="md" shadow="lg" withBorder>
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
                classStyles={classes}
              />
              <AvatarGallery
                avatars={avatars}
                toggledAvatarId={toggledAvatar?.id}
                handleAvatarChange={handleAvatarChange}
                classStyles={classes}
              />
              <Center>
                <Button
                  radius="md"
                  style={{ flex: 1 }}
                  disabled={toggledAvatar == undefined || toggledButton == undefined}
                  onClick={() => handleStartGame()}
                >
                  Save Changes and Start Adventure
                </Button>
              </Center>
            </>
          ) : (
            <>
              <ThemeList themes={themes} handleThemeChange={handleSettingChange} classStyles={classes} />
            </>
          )}
        </>
      )}
    </Paper>
  );
};
