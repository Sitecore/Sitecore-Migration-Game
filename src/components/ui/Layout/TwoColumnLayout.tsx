import { Box, Center, Grid, GridItem } from '@chakra-ui/react';
import { FC } from 'react';
import { CookieDisclaimer } from '../CookieDisclaimer/CookieDisclaimer';
import { Loading } from '../Loading/Loading';
import { Navigation } from '../Navigation/Navigation';

interface TwoColumnLayoutProps {
  leftColumn: React.ReactNode;
  rightColumn: React.ReactNode;
  backgroundImage?: string;
  loading?: boolean;
  showProgressBar?: boolean;
  showResetButton?: boolean;
  showSaveButton?: boolean;
}

export const TwoColumnLayout: FC<TwoColumnLayoutProps> = ({
  leftColumn,
  rightColumn,
  backgroundImage = '',
  loading = false,
  showProgressBar = true,
  showResetButton = true,
  showSaveButton = true,
}) => {
  return (
    <>
      {loading ? (
        <Loading message="Loading Adventure Artifacts..." />
      ) : (
        <>
          <Box
            minH="100vh"
            w="full"
            backgroundImage={backgroundImage}
            backgroundAttachment="fixed"
            backgroundSize="cover"
            backgroundRepeat="no-repeat"
            paddingX={4}
          >
            <Navigation
              showProgressBar={showProgressBar}
              showSaveButton={showSaveButton}
              showResetButton={showResetButton}
            />
            <Center>
              <Grid
                h="100%"
                w={{ base: '1200px' }}
                templateColumns={{ base: '1fr', md: '1fr 3fr' }}
                gap={{ base: 0, lg: 5 }}
                my={[2, 8]}
                mx="auto"
              >
                <GridItem>{leftColumn}</GridItem>
                <GridItem>{rightColumn}</GridItem>
              </Grid>
            </Center>
          </Box>
          <CookieDisclaimer />
        </>
      )}
    </>
  );
};
