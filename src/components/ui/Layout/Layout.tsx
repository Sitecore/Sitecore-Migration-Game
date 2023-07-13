import { Box } from '@chakra-ui/react';
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
      <Box as="section">{children}</Box>
    </>
  );
};
