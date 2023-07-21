import { Box, Center, Grid, GridItem } from '@chakra-ui/react';
import { FC } from 'react';
import { Loading } from '../Loading/Loading';

interface SingleColumnLayoutProps {
  children: React.ReactNode;
  backgroundImage?: string;
  loading?: boolean;
}

export const SingleColumnLayout: FC<SingleColumnLayoutProps> = ({
  children,
  backgroundImage = '/corporate/background.jpg',
  loading = false,
}) => {
  return (
    <Box
      minH="calc(100vh - 88px)"
      w="full"
      backgroundImage={backgroundImage}
      backgroundAttachment="fixed"
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
    >
      <Center>
        {loading ? (
          <Loading message="Loading Application..." />
        ) : (
          <Grid h="100%" w={{ base: '1200px' }} gap={0} my={8} mx="auto">
            <GridItem>{children}</GridItem>
          </Grid>
        )}
      </Center>
    </Box>
  );
};
