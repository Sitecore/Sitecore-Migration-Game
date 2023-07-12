import { Box, Button, Center, SimpleGrid, Title } from '@mantine/core';
import { IPersona } from 'models';
import { FC } from 'react';

interface PersonaListProps {
  personas: IPersona[] | undefined;
  toggledButtonId: string | undefined;
  handlePersonaChange: (personaId: string) => void;
  classStyles: any;
}

export const PersonaList: FC<PersonaListProps> = ({ personas, toggledButtonId, handlePersonaChange, classStyles }) => {
  return (
    <>
      <Box>
        <Title order={3}>Select Your Role:</Title>
        <Center>
          <Button.Group>
            <SimpleGrid mt={10} cols={4} breakpoints={[{ maxWidth: '56rem', cols: 1, spacing: 'sm' }]}>
              {personas?.map((p, i) => {
                const isToggled = p.id === toggledButtonId;
                return (
                  <Button
                    key={p.id}
                    radius="md"
                    style={{ flex: 1 }}
                    color={isToggled ? '#333378' : 'blue'}
                    onClick={() => {
                      handlePersonaChange(p.id);
                    }}
                  >
                    {p.name}
                  </Button>
                );
              })}
            </SimpleGrid>
          </Button.Group>
        </Center>
      </Box>
    </>
  );
};
