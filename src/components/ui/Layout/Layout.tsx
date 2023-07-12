import { Box, Center, Container } from '@chakra-ui/react';
import { FC } from 'react';
import Navigation from '../Navigation/Navigation';

interface LayoutProps {
  children: React.ReactNode;
  backgroundImage?: string;
}

export const Layout: FC<LayoutProps> = ({ children, backgroundImage = '/corporate/background.jpg' }) => {
  return (
    <>
      <Navigation />
      <Box position="relative" h="calc(100vh - 64px)" w="full" backgroundImage={backgroundImage} backgroundSize="cover">
        <Center>
          <Container minW="container.lg">{children}</Container>
        </Center>
      </Box>
    </>
  );
};
