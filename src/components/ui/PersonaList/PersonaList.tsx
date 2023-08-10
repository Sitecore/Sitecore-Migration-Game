import { Box, Button, ButtonGroup, Center, Heading, SimpleGrid, Stack } from '@chakra-ui/react';
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
        <Center>
          <Heading variant={'gameTitle'}>Select Your Role:</Heading>
        </Center>
        <Center>
          <Stack direction={{ base: 'column', md: 'row' }} spacing="6" mt={10}  >
            {personas?.map((p, i) => {
              const isToggled = p.id === toggledButtonId;
              return (
                <Button
                  key={p.id}
                  style={{ flex: 1 }}
                  minH={'35px'}
                  onClick={() => {
                    handlePersonaChange(p.id);
                  }}
                  variant={isToggled ? 'roleSelected' : 'role'}
                >
                  {p.name}
                </Button>
              );
            })}
          </Stack>
        </Center>
      </Box>
    </>
  );
};
