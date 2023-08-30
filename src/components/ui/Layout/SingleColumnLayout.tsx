import { Box, Center, Grid, GridItem } from '@chakra-ui/react';
import { FC } from 'react';
import { CookieDisclaimer } from '../CookieDisclaimer/CookieDisclaimer';
import { Loading } from '../Loading/Loading';
import { Navigation } from '../Navigation/Navigation';

interface SingleColumnLayoutProps {
  children: React.ReactNode;
  backgroundImage?: string;
  loading?: boolean;
  showProgressBar?: boolean;
  showResetButton?: boolean;
  showSaveButton?: boolean;
  showFeedbackButton?: boolean;
}

export const SingleColumnLayout: FC<SingleColumnLayoutProps> = ({
  children,
  backgroundImage = '/corporate/background.jpg',
  loading = false,
  showProgressBar = true,
  showResetButton = true,
  showSaveButton = true,
  showFeedbackButton = true,
}) => {
  return (
    <>
      <Box
        minH="100vh"
        w="full"
        backgroundImage={backgroundImage}
        backgroundAttachment="fixed"
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
        paddingX={4}
        paddingBottom="140px"
      >
        <Navigation
          showProgressBar={showProgressBar}
          showSaveButton={showSaveButton}
          showResetButton={showResetButton}
          showFeedbackButton={showFeedbackButton}
        />
        <Center>
          {loading ? (
            <Loading message="Loading Application..." />
          ) : (
            <Grid h="100%" w={{ base: '1200px' }} gap={0} my={{ sm: 0, md: 8 }} mx="auto">
              <GridItem>{children}</GridItem>
            </Grid>
          )}
        </Center>
      </Box>
      <CookieDisclaimer />
    </>
  );
};
