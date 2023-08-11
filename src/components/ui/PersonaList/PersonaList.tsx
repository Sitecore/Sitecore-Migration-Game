import { Box, Button, ButtonGroup, Center, Heading, SimpleGrid } from '@chakra-ui/react';
import { IPersona } from 'models';
import { FC } from 'react';
import { useGameInfoContext } from '../GameInfoContext/GameInfoContext';

interface PersonaListProps {
  personas: IPersona[] | undefined;
  toggledButtonId: string | undefined;
  handlePersonaChange: (personaId: string) => void;
  classStyles: any;
}

export const PersonaList: FC<PersonaListProps> = ({ personas, toggledButtonId, handlePersonaChange, classStyles }) => {
  const gameInfoContext = useGameInfoContext();

  return (
    <>
      <Box>
        <Center>
          <Heading size="xl" variant={'gameTitle'}>
            Select Your Role:
          </Heading>
        </Center>
        <Center>
          <SimpleGrid mt={10}>
            <ButtonGroup variant="outline" spacing="6">
              {personas?.map((p, i) => {
                const isToggled = p.id === toggledButtonId;
                return (
                  <Button
                    isActive={isToggled}
                    key={p.id}
                    style={{ flex: 1 }}
                    onClick={() => {
                      handlePersonaChange(p.id);
                    }}
                    variant={gameInfoContext.theme?.chakraTheme == 'corporate' ? 'outline' : 'solid'}
                    size={'lg'}
                  >
                    {p.name}
                  </Button>
                );
              })}
            </ButtonGroup>
          </SimpleGrid>
        </Center>
      </Box>
    </>
  );
};
