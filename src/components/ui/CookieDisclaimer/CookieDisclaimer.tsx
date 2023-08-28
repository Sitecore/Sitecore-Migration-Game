import { Box, Container, Stack, Text } from '@chakra-ui/react';
import { FC } from 'react';

interface CookieDisclaimerProps {}

export const CookieDisclaimer: FC<CookieDisclaimerProps> = (props) => {
  return (
    <Box borderTopWidth="1px" bgColor="#fff" position="fixed" bottom="0" width="100%" padding="0">
      <Container py={{ base: '4', md: '3.5' }} px={4} width="100%" minWidth="full">
        <Stack
          direction="row"
          spacing={{ base: '3', md: '4' }}
          justify="space-between"
          align={{ base: 'start', md: 'center' }}
        >
          <Box>
            <Text fontWeight="medium">Privacy Disclaimer</Text>
            <Text color="fg.muted">
              We use cookies to provide functionality, to analyze our traffic and to enable social media functionality.
              By using this website, you agree to the terms of our{' '}
              <a href="https://www.sitecore.com/trust/cookie-policy" target="_blank">
                Cookie Policy
              </a>
              .
            </Text>
          </Box>

          {/* <IconButton icon={<FiX />} variant="tertiary" aria-label="Close banner" /> */}
        </Stack>
      </Container>
    </Box>
  );
};
