import { Box } from '@chakra-ui/react';
import { FC } from 'react';
import { Navigation } from '..';

interface LayoutProps {
  children: React.ReactNode;
  showProgressBar?: boolean;
  showResetButton?: boolean;
  showSaveButton?: boolean;
}

export const Layout: FC<LayoutProps> = ({
  children,
  showProgressBar = true,
  showResetButton = true,
  showSaveButton = true,
}) => {
  return (
    <>
      <Navigation showProgressBar={showProgressBar} showSaveButton={showSaveButton} showResetButton={showResetButton} />
      <Box as="section">{children}</Box>
    </>
  );
};
