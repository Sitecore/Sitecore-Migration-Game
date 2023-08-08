import {
  Box,
  Button,
  Center,
  Heading,
  Image,
  ScaleFade,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { ITheme } from 'models';
import { FC } from 'react';

interface ThemeListProps {
  themes: ITheme[] | undefined;
  handleThemeChange: (themeId: string) => void;
  classStyles: any;
}

export const ThemeList: FC<ThemeListProps> = ({ themes, handleThemeChange, classStyles }) => (
  <>
    <Box>
      <Center>
        <Heading variant={'gameTitle'}>Select Your Theme:</Heading>
      </Center>
      <SimpleGrid
        columns={2}
        spacingX="40px"
        spacingY="20px"
        alignContent={'center'}
        justifyContent={'center'}
        paddingBottom={20}
        marginTop={20}
      >
        {themes?.map((theme, i) => (
          <ScaleFade initialScale={0.9} in={true}>
            <Center>
              <Box
                maxWidth={'80%'}
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'10px 25px 50px 25px rgba(0, 0, 0, 0.25)'}
                rounded={'lg'}
                overflow={'hidden'}
                key={i}
              >
                <Stack textAlign={'center'} bg={useColorModeValue('white', 'gray.800')}>
                  {theme.characterImage?.results !== undefined && (
                    <Image
                      src={theme.characterImage!.results[0].fileUrl}
                      alt={theme.characterImage!.results[0].fileName ?? ''}
                      maxHeight={'300px'}
                      fit={'cover'}
                    />
                  )}
                  <Box p={6}>
                    <Center>
                      <Heading as="h3" size="md" marginBottom={5}>
                        {theme.name}
                      </Heading>
                    </Center>

                    <Text fontSize="md" height={'150px'}>
                      {theme.description}
                    </Text>
                    <Button variant={'continue'} onClick={() => handleThemeChange(theme.id)} margin={5} paddingX={10}>
                      Continue
                    </Button>
                  </Box>
                </Stack>
              </Box>
            </Center>
          </ScaleFade>
        ))}
      </SimpleGrid>
    </Box>
  </>
);
