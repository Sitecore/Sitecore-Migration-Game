import { Box, Button, HStack, Icon, Tooltip, useColorModeValue } from '@chakra-ui/react';
import Image from 'next/image';
import Router from 'next/router';
import { FC } from 'react';
import { MdCached, MdSave } from 'react-icons/md';
import { InfoModal, ProgressTracker } from '..';

interface NavigationProps {
  showProgressBar?: boolean;
  showResetButton?: boolean;
  showSaveButton?: boolean;
  showSettingsButton?: boolean;
}

export const Navigation: FC<NavigationProps> = ({
  showProgressBar = true,
  showResetButton = true,
  showSaveButton = true,
  showSettingsButton = true,
}) => {
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
                  <Tooltip label="Save Your Result" aria-label="Save Your Result">
                    <Button variant={'iconButton'}>
                      <Icon as={MdSave} fontSize={24} />
                    </Button>
                  </Tooltip>
                )}
                {showResetButton && (
                  <Tooltip label="Start Over" aria-label="Start Over">
                    <Button onClick={() => Router.push('/')} variant={'iconButton'}>
                      <Icon as={MdCached} fontSize={24} />
                    </Button>
                  </Tooltip>
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
