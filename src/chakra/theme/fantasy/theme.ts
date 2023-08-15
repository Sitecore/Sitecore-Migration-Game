import { ThemeConfig, extendTheme } from '@chakra-ui/react';
import { avatarTheme } from './avatar';
import { buttonTheme } from './button';
import { cardTheme } from './card';
import { containerTheme } from './container';
import { headingTheme } from './headings';
import { progressTheme } from './progress';
import { textTheme } from './text';
import { tooltipTheme } from './tooltip';

const config: ThemeConfig = {
  useSystemColorMode: false,
  initialColorMode: 'light',
  cssVarPrefix: 'fantasy',
};

const fantasyTheme = extendTheme({
  config: config,
  components: {
    Container: containerTheme,
    Avatar: avatarTheme,
    Heading: headingTheme,
    Text: textTheme,
    Progress: progressTheme,
    Tooltip: tooltipTheme,
    Card: cardTheme,
    Button: buttonTheme,
  },
});

export default fantasyTheme;
