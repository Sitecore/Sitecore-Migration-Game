import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import { ITheme } from 'models';
import { FC } from 'react';

interface ThemeListProps {
  themes: ITheme[] | undefined;
  handleThemeChange: (themeId: string) => void;
  classStyles: any;
}

export const ThemeList: FC<ThemeListProps> = ({ themes, handleThemeChange, classStyles }) => (
  <Box>
    <Center>
      <Heading variant={'gameTitle'}>Select Your Theme:</Heading>
    </Center>
    <Flex
      align="stretch"
      justifyContent={'center'}
      alignItems={'center'}
      direction={{ base: 'column', md: 'row' }}
      marginTop={[5, 20]}
    >
      {themes?.map((theme, i) => (
        <Box
          flex={1}
          m={[2, 4]}
          maxWidth={['100%', '80%']}
          bg={useColorModeValue('white', 'gray.800')}
          boxShadow={'10px 25px 50px 25px rgba(0, 0, 0, 0.25)'}
          rounded={'lg'}
          overflow={'hidden'}
          key={i}
        >
          <Stack
            textAlign={'center'}
            justifyContent={'space-between'}
            height={'100%'}
            bg={useColorModeValue('white', 'gray.800')}
          >
            {theme.characterImage?.results !== undefined && (
              <Image
                src={theme.characterImage!.results[0].fileUrl}
                alt={theme.characterImage!.results[0].fileName ?? ''}
                maxHeight={['0', '300px']}
                fit={'cover'}
                rounded={['sm', 'lg']}
              />
            )}
            <Center>
              <Heading as="h3" size="md" marginBottom={5}>
                {theme.name}
              </Heading>
            </Center>

            <Text fontSize="md" p={2}>
              {theme.description}
            </Text>
            <Button variant={'solid'} onClick={() => handleThemeChange(theme.id)} margin={5} paddingX={10}>
              Continue
            </Button>
          </Stack>
        </Box>
      ))}
    </Flex>
  </Box>
);
