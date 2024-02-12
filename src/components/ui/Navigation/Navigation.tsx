import { Box, Button, HStack, IconButton, Link, Show, Tooltip } from '@chakra-ui/react';
import Image from 'next/image';
import Router from 'next/router';
import { FC } from 'react';
import { MdCached, MdOutlineMarkChatRead, MdSave } from 'react-icons/md';

import { InfoModal } from '../InfoModal/InfoModal';
import { ProgressTracker } from '../ProgressTracker/ProgressTracker';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';

interface NavigationProps {
  showProgressBar?: boolean;
  showResetButton?: boolean;
  showSaveButton?: boolean;
  showSettingsButton?: boolean;
  showFeedbackButton?: boolean;
}

export const Navigation: FC<NavigationProps> = ({
  showProgressBar = true,
  showResetButton = true,
  showSaveButton = true,
  showFeedbackButton = true,
}) => {

  return (
    <>
      <Box as="section" py={['2', '6']} background={'transparent'}>
        <Box maxW={{ base: '1200px' }} mx="auto" px={{ base: '1', md: '8' }}>
          <HStack justify="space-between">
            <Box width="200px">
              <Link href="/">
                <Image src="/corporate/logo-sitecore.svg" alt="Sitecore Logo" width={200} height={50} />
              </Link>
            </Box>
            {showProgressBar && (
              <Box width="300px" px="4">
                <ProgressTracker />
              </Box>
            )}
            <Box alignContent="right">
              <HStack>
                {showFeedbackButton && (
                  <Show
                    above={
                      showProgressBar && showResetButton
                        ? 'md'
                        : 'sm'
                    }
                  >
                    <Tooltip label="Leave Feedback" aria-label="Leave Feedback">
                      <Link href="https://forms.office.com/e/Mc6wczVqgh" isExternal>
                        <Button
                          rightIcon={<MdOutlineMarkChatRead size={24} />}
                          colorScheme="neutral"
                          variant="solid"
                          aria-label={''}
                        >
                          Give Feedback
                        </Button>
                      </Link>
                    </Tooltip>
                  </Show>
                )}

                {showSaveButton && (
                  <Tooltip label="Save Your Result" aria-label="Save Your Result">
                    <IconButton
                      variant='solid'
                      size={['md']}
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
                      onClick={() => Router.push('/settings')}
                      variant='solid'
                      size={['md']}
                      colorScheme="neutral"
                      aria-label={'Start over'}
                      icon={<MdCached size={24} />}
                    ></IconButton>
                  </Tooltip>
                )}

                <InfoModal />
              </HStack>
                <ThemeSwitcher />
            </Box>
          </HStack>
        </Box>
      </Box>
    </>
  );
};
