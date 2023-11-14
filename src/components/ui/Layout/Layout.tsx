import { Box, BoxProps } from '@chakra-ui/react';
import { FC } from 'react';

export type LayoutProps = BoxProps & {
  children?: React.ReactNode;
  showProgressBar?: boolean;
  showResetButton?: boolean;
  showSaveButton?: boolean;
  showFeedbackButton?: boolean;
};

export const Layout: FC<LayoutProps> = ({ children, ...rest }) => {
  return (
    <Box as="section" {...rest}>
      {children}
    </Box>
  );
};
