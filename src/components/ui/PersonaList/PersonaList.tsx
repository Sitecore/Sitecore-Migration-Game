import { Box, Button, Card, Group, SimpleGrid, Title } from '@mantine/core';
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
        <Title order={3}>Select Your Role:</Title>
        <SimpleGrid mt={10} cols={4} breakpoints={[{ maxWidth: '56rem', cols: 1, spacing: 'sm' }]}>
          {personas?.map((p, i) => (
            <Card radius="md" p="md" className={classStyles.card} key={i}>
              <Group mt="xs">
                <Button radius="md" style={{ flex: 1 }} onClick={() => handlePersonaChange(p.id)}>
                  {p.name}
                </Button>
              </Group>
            </Card>
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
};
