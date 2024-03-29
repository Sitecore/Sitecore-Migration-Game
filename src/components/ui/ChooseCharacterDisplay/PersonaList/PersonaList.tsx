import { Box, Button, Center, Heading, SimpleGrid } from '@chakra-ui/react';
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
          <Heading size={{ base: 'md', xl: 'xl' }} variant={'gameTitle'}>
            Select Your Role:
          </Heading>
        </Center>
        <Center>
          <SimpleGrid mt={10} columns={{ base: 1, sm: 2, md: 4 }} spacing={6}>
            {personas?.map((p, i) => {
              const isToggled = p.id === toggledButtonId;
              return (
                <Button
                  isActive={isToggled}
                  key={p.id}
                  value={p.name}
                  style={{ flex: 1 }}
                  onClick={() => {
                    handlePersonaChange(p.id);
                  }}
                  variant={'solid'}
                >
                  {p.name}
                </Button>
              );
            })}
          </SimpleGrid>
        </Center>
      </Box>
    </>
  );
};
