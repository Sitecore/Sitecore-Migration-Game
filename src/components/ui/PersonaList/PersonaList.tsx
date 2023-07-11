import { Box, Button, SimpleGrid, Title } from '@mantine/core';
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
            <Button radius="md" style={{ flex: 1 }} onClick={() => handlePersonaChange(p.id)}>
              {p.name}
            </Button>
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
};
