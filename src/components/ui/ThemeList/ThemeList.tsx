import { Box, Button, Card, Group, Image, SimpleGrid, Text, Title } from '@mantine/core';
import { ITheme } from 'models';
import { FC } from 'react';

interface ThemeListProps {
  themes: ITheme[] | undefined;
  handleThemeChange: (themeId: string) => void;
  classStyles: any;
}

export const ThemeList: FC<ThemeListProps> = ({ themes, handleThemeChange, classStyles }) => {
  return (
    <>
      <Box>
        <Title order={3}>Select Your Theme:</Title>
        <SimpleGrid mt={10} cols={2} breakpoints={[{ maxWidth: '56rem', cols: 1, spacing: 'sm' }]}>
          {themes?.map((theme, i) => (
            <Card withBorder radius="md" p="md" className={classStyles.card} key={i}>
              {theme.characterImage?.results !== undefined && (
                <Card.Section>
                  <Image
                    src={theme.characterImage!.results[0].fileUrl}
                    alt={theme.characterImage!.results[0].fileName ?? ''}
                  />
                </Card.Section>
              )}
              <Card.Section className={classStyles.section} mt="md">
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
                <Button radius="md" style={{ flex: 1 }} onClick={() => handleThemeChange(theme.id)}>
                  Continue
                </Button>
              </Group>
            </Card>
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
};
