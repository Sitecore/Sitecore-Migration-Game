import { Box, Button, Card, Group, Image, SimpleGrid, Text, Title } from '@mantine/core';
import { IPersona } from 'models';
import { FC } from 'react';

interface PersonaListProps {
  personas: IPersona[] | undefined;
  handlePersonaChange: (personaId: string) => void;
  classStyles: any;
}

export const PersonaList: FC<PersonaListProps> = ({ personas, handlePersonaChange, classStyles }) => {
  return (
    <>
      <Box>
        <Title order={3}>Select Your Character:</Title>
        <SimpleGrid mt={10} cols={2} breakpoints={[{ maxWidth: '56rem', cols: 1, spacing: 'sm' }]}>
          {personas?.map((p, i) => (
            <Card withBorder radius="md" p="md" className={classStyles.card} key={i}>
              {p.personaImage?.results !== undefined && (
                <Card.Section>
                  <Image src={p.personaImage!.results[0].fileUrl} alt={p.personaImage!.results[0].fileName ?? ''} />
                </Card.Section>
              )}
              <Card.Section className={classStyles.section} mt="md">
                <Group position="apart">
                  <Text fz="lg" fw={500}>
                    {p.name}
                  </Text>
                </Group>
              </Card.Section>
              <Group mt="xs">
                <Button radius="md" style={{ flex: 1 }} onClick={() => handlePersonaChange(p.id)}>
                  Start Game
                </Button>
              </Group>
            </Card>
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
};
