import { Box } from '@chakra-ui/react';
import { FC } from 'react';

export interface LayoutProps {
  children: React.ReactNode;
  showProgressBar?: boolean;
  showResetButton?: boolean;
  showSaveButton?: boolean;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Box as="section">{children}</Box>
    </>
  );
};
