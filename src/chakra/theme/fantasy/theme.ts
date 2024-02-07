import { extendTheme, withDefaultColorScheme } from '@chakra-ui/react';
import { buttonTheme } from './button';
import { cardTheme } from './card';
import { containerTheme } from './container';
import { headingTheme } from './headings';
import { progressTheme } from './progress';
import { textTheme } from './text';
import { tooltipTheme } from './tooltip';

const fantasyTheme = extendTheme(
  withDefaultColorScheme({
    colorScheme: 'primary',
  }),
  {
    useSystemColorMode: false,
    initialColorMode: 'light',
    semanticTokens: {
      fonts: {
        heading: 'var(--font-fondamento)',
      },
    },
    components: {
      Container: containerTheme,
      Heading: headingTheme,
      Text: textTheme,
      Progress: progressTheme,
      Tooltip: tooltipTheme,
      Card: cardTheme,
      Button: buttonTheme,
    },
  });

export default fantasyTheme;
