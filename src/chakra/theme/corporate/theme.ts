import { extendTheme } from '@chakra-ui/react';
import { withProse } from '@nikolovlazar/chakra-ui-prose';
import sitecoreTheme from '@sitecore/blok-theme';
// Load customizations
import { cardTheme } from './card';
import { buttonTheme } from './button';

export const corporateTheme = extendTheme(
  {
    initialColorMode: 'light',
    useSystemColorMode: false,
    styles: {},
    colors: {},
    components: {
      Card: cardTheme,
      Button: buttonTheme,
    },
    sizes: {},
    fonts: {},
  },
  withProse(),
  sitecoreTheme
);
