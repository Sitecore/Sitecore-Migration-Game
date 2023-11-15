import { extendTheme } from '@chakra-ui/react';
import { withProse } from '@nikolovlazar/chakra-ui-prose';
import sitecoreTheme from '@sitecore/blok-theme';
// Load customizations
import { cardTheme } from './card';

export const corporateTheme = extendTheme(
  {
    styles: {},
    colors: {},
    components: {
      Card: cardTheme,
    },
    sizes: {},
    fonts: {},
  },
  withProse(),
  sitecoreTheme
);
