import { Box, HStack, IconButton, Tooltip } from '@chakra-ui/react';
import Image from 'next/image';
import Router from 'next/router';
import { FC } from 'react';
import { MdCached, MdSave } from 'react-icons/md';
import { InfoModal, ProgressTracker, useGameInfoContext } from '..';

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
  const gameInfoContext = useGameInfoContext();

  return (
    <>
      <Box as="section" py="6" background={'transparent'}>
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
                    <IconButton
                      variant={gameInfoContext.theme?.chakraTheme == 'corporate' ? 'solid' : 'iconButton'}
                      size={'lg'}
                      colorScheme="neutral"
                      data-type="icon"
                      aria-label={'Start over'}
                      icon={<MdSave size={24} />}
                    ></IconButton>
                  </Tooltip>
                )}
                {showResetButton && (
                  <Tooltip label="Start Over" aria-label="Start Over">
                    <IconButton
                      onClick={() => Router.push('/')}
                      variant={gameInfoContext.theme?.chakraTheme == 'corporate' ? 'solid' : 'iconButton'}
                      size={'lg'}
                      colorScheme="neutral"
                      aria-label={'Start over'}
                      icon={<MdCached size={24} />}
                    ></IconButton>
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
