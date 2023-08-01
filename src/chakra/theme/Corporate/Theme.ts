import { ThemeConfig, extendTheme } from '@chakra-ui/react';
import { buttonTheme } from './button';

const config: ThemeConfig = {
  useSystemColorMode: false,
  initialColorMode: 'light',
  cssVarPrefix: 'corporate',
};

const corporateTheme = extendTheme({
  config,
  baseStyle: {},
  components: { Button: buttonTheme },
});

export default corporateTheme;
