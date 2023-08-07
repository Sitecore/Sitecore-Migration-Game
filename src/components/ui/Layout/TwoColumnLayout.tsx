import { Box, Center, Grid, GridItem } from '@chakra-ui/react';
import { FC } from 'react';
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
  backgroundImage = '/corporate/background.jpg',
  loading = false,
  showProgressBar = true,
  showResetButton = true,
  showSaveButton = true,
}) => {
  return (
    <Box
      minH="100vh"
      w="full"
      backgroundImage={backgroundImage}
      backgroundAttachment="fixed"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      paddingX={4}
    >
      <Navigation showProgressBar={showProgressBar} showSaveButton={showSaveButton} showResetButton={showResetButton} />{' '}
      <Center>
        {loading ? (
          <Box mt={10} mb={10}>
            <Loading message="Loading Adventure Artifacts..." />
          </Box>
        ) : (
          <Grid
            h="100%"
            w={{ base: '1200px' }}
            templateColumns={{ base: '1fr', lg: '1fr 3fr' }}
            gap={{ base: 0, lg: 5 }}
            my={8}
            mx="auto"
          >
            <GridItem>{leftColumn}</GridItem>
            <GridItem>{rightColumn}</GridItem>
          </Grid>
        )}
      </Center>
    </Box>
  );
};
