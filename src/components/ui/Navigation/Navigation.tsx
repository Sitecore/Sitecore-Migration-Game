import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  Stack,
  Icon,
  Text} from '@chakra-ui/react';
import Image from 'next/image';
import { MdSave, MdSettings } from 'react-icons/md';

export default function Navigation() {
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={32}>
        <Flex h={64} alignItems={'center'} justifyContent={'space-evenly'}>

          <Box>
            <Image src="/corporate/logo-sitecore.svg" alt="Sitecore Logo" width={200} height={50} />
          </Box>
          <Text>Progress Bar Here</Text>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button>
                <Icon as={MdSave} boxSize={32} />
              </Button>
              <Button>
                <Icon as={MdSettings} boxSize={32} />
              </Button>

            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}