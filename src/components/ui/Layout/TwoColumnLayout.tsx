import { Box, Center, Grid, GridItem } from '@chakra-ui/react';
import { FC } from 'react';
import { Loading } from '../Loading/Loading';

interface TwoColumnLayoutProps {
  leftColumn: React.ReactNode;
  rightColumn: React.ReactNode;
  backgroundImage?: string;
  loading?: boolean;
}

export const TwoColumnLayout: FC<TwoColumnLayoutProps> = ({
  leftColumn,
  rightColumn,
  backgroundImage = '/corporate/background.jpg',
  loading = false,
}) => {
  return (
    <Box position="relative" h="calc(100vh - 64px)" w="full" backgroundImage={backgroundImage} backgroundSize="cover">
      <Center>
        {loading ? (
          <Loading />
        ) : (
          <Grid
            h="100%"
            w={{ base: '1200px' }}
            templateColumns={{ base: '1fr', lg: '1fr 2fr' }}
            gap={0}
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
