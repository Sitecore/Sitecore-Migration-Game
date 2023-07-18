import { Box, Button, HStack, Icon, useColorModeValue } from '@chakra-ui/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { MdCached, MdSave } from 'react-icons/md';
import { InfoModal, ProgressTracker, useGameInfoContext } from '..';

interface NavigationProps {
  showProgressBar?: boolean;
  showResetButton?: boolean;
  showSaveButton?: boolean;
}

export const Navigation: FC<NavigationProps> = ({
  showProgressBar = true,
  showResetButton = true,
  showSaveButton = true,
}) => {
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
        <Box maxW={{ base: '1200px' }} mx="auto" px={{ base: '6', md: '8' }}>
          <HStack justify="space-between">
            <Box width="200px">
              <Image src="/corporate/logo-sitecore.svg" alt="Sitecore Logo" width={200} height={50} />
            </Box>
            {showProgressBar && (
              <Box width="300px">
                <ProgressTracker />
              </Box>
            )}
            <Box alignContent="right" width="100px">
              <HStack spacing={2}>
                {showSaveButton && (
                  <Button>
                    <Icon as={MdSave} fontSize={24} />
                  </Button>
                )}
                {showResetButton && (
                  <Button onClick={handleAppReset}>
                    <Icon as={MdCached} fontSize={24} />
                  </Button>
                )}
                <InfoModal />
              </HStack>
            </Box>
          </HStack>
        </Box>
      </Box>
    </>
  );
};
