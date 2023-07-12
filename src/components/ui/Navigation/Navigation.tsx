import { Box, Button, HStack, Icon, Progress, useColorModeValue } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { MdCached, MdSave } from 'react-icons/md';
import { useGameInfoContext } from '..';

export default function Navigation() {
  const gameInfoContext = useGameInfoContext();
  const router = useRouter();

  const handleAppReset = () => {
    gameInfoContext.resetAnswers();
    router.push('/');
  };

  const handleStartOver = () => {
    gameInfoContext.resetAnswers();
    router.push('/prompt');
  };

  return (
    <>
      <Box as="section" bg={useColorModeValue('gray.100', 'gray.900')} py="6">
        <Box maxW={{ base: 'xl', md: '5xl' }} mx="auto" px={{ base: '6', md: '8' }}>
          <HStack justify="space-between">
            <Box width="200px">
              <Image src="/corporate/logo-sitecore.svg" alt="Sitecore Logo" width={200} height={50} />
            </Box>
            <Box width="300px">
              <Progress hasStripe colorScheme="green" value={100} />
            </Box>
            <Box alignContent="right" width="100px">
              <HStack spacing={2}>
                <Button>
                  <Icon as={MdSave} fontSize={24} />
                </Button>
                <Button onClick={handleAppReset}>
                  <Icon as={MdCached} fontSize={24} />
                </Button>
              </HStack>
            </Box>
          </HStack>
        </Box>
      </Box>
    </>
  );
}
