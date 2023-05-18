import {
  Button,
  Card,
  Flex,
  Group,
  Image,
  Loader,
  Modal,
  SimpleGrid,
  Stack,
  Text,
  createStyles,
  rem,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Loading } from 'components/ui/Loading/Loading';
import { ThemeService } from 'lib/ThemeService';
import { ITheme } from 'models/Definitions';
import { FC, useEffect, useState } from 'react';

interface SettingModalProps {
  isOpen: boolean;
  onClose: (themeId: string) => void;
}

//#region Styles
const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
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

  label: {
    textTransform: 'uppercase',
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
}));
//#endregion

export const SettingModal: FC<SettingModalProps> = ({ isOpen, onClose }) => {
  //#region State/Props
  const { classes } = useStyles();
  const [themes, setTheme] = useState<ITheme[] | undefined>(); //config?.theme || 'corporate'
  const [loading, { toggle: toggleLoading }] = useDisclosure(true);
  let themeService = ThemeService();
  //#endregion

  //#region useEffect
  useEffect(() => {
    initializeSettings();

    //eslint-disable-next-line
  }, []);
  //#endregion

  //#region Functions
  const initializeSettings = async () => {
    const data = await themeService.GetAllThemes();

    if (data?.results !== undefined) {
      setTheme(data.results);
    }

    toggleLoading();
  };
  //#endregion

  return (
    <Modal
      opened={isOpen}
      onClose={() => onClose('corporate')}
      overlayProps={{ opacity: 0.8, blur: 4 }}
      withCloseButton={false}
      closeOnEscape={false}
      size="xl"
      closeOnClickOutside={false}
    >
      <Flex mih={50} gap="md" justify="center" align="center">
        {loading ? (
          <>
            <Loading message="Loading settings..." />
          </>
        ) : (
          <SimpleGrid cols={2} breakpoints={[{ maxWidth: '56rem', cols: 1, spacing: 'sm' }]}>
            {themes?.map((theme, i) => (
              <Card withBorder radius="md" p="md" className={classes.card} key={i}>
                {theme.characterImage?.results !== undefined && (
                  <Card.Section>
                    <Image
                      src={theme.characterImage!.results[0].fileUrl}
                      alt={theme.characterImage!.results[0].fileName ?? ''}
                    />
                  </Card.Section>
                )}
                <Card.Section className={classes.section} mt="md">
                  <Group position="apart">
                    <Text fz="lg" fw={500}>
                      {theme.name}
                    </Text>
                  </Group>
                  <Text fz="sm" mt="xs">
                    {theme.description}
                  </Text>
                </Card.Section>
                <Group mt="xs">
                  <Button radius="md" style={{ flex: 1 }} onClick={() => onClose(theme.id)}>
                    Continue
                  </Button>
                </Group>
              </Card>
            ))}
          </SimpleGrid>
        )}
      </Flex>
    </Modal>
  );
};
