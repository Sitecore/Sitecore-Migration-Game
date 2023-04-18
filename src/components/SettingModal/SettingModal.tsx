import { Badge, Button, Card, Flex, Group, Image, Modal, SimpleGrid, Text, createStyles, rem } from '@mantine/core';
import { IDefinition } from 'models/Definitions';
import { FC } from 'react';

interface SettingModalProps {
  isOpen: boolean;
  onClose: (theme: string) => void;
  config: IDefinition | undefined;
}

export const SettingModal: FC<SettingModalProps> = ({ isOpen, onClose, config }) => {
  const { classes } = useStyles();

  return (
    <Modal
      opened={isOpen}
      onClose={() => onClose('corporate')}
      overlayProps={{ opacity: 0.8, blur: 4 }}
      size="60%"
      withCloseButton={false}
      closeOnEscape={false}
      closeOnClickOutside={false}
    >
      <Flex mih={50} gap="md" justify="center" align="center">
        <SimpleGrid cols={2} breakpoints={[{ maxWidth: '56rem', cols: 1, spacing: 'sm' }]}>
          <Card withBorder radius="md" p="md" className={classes.card}>
            <Card.Section>
              <Image src="/8-DY3mYkCSjoXc76H.png" />
            </Card.Section>
            <Card.Section className={classes.section} mt="md">
              <Group position="apart">
                <Text fz="lg" fw={500}>
                  Fantasy Adventure
                </Text>
                <Badge variant="dot" color="orange" size="sm">
                  Fantasy
                </Badge>
              </Group>
              <Text fz="sm" mt="xs">
                Take a journey through the fantasy world of the 5th Age. You will be guided through a maze of questions
                which will help you find the scroll of Sitecore.
              </Text>
            </Card.Section>
            <Group mt="xs">
              <Button radius="md" style={{ flex: 1 }} onClick={() => onClose('fantasy')}>
                Continue
              </Button>
            </Group>
          </Card>
          <Card withBorder radius="md" p="md" className={classes.card}>
            <Card.Section>
              <Image src="/sitecore-theme.jpg" />
            </Card.Section>
            <Card.Section className={classes.section} mt="md">
              <Group position="apart">
                <Text fz="lg" fw={500}>
                  Corporate (Default)
                </Text>
                <Badge variant="dot" color="orange" size="sm">
                  Corporate
                </Badge>
              </Group>
              <Text fz="sm" mt="xs">
                Take a journey to discover the required items for your organizations Sitecore Composable journey. By the
                end of this short questionnaire you'll have a set of steps to guide you on your journey.
              </Text>
            </Card.Section>
            <Group mt="xs">
              <Button radius="md" style={{ flex: 1 }} onClick={() => onClose('corporate')}>
                Continue
              </Button>
            </Group>
          </Card>
        </SimpleGrid>
      </Flex>
    </Modal>
  );
};

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
