import { ThemeConfig, extendTheme } from '@chakra-ui/react';
import { avatarTheme } from './avatar';
import { buttonTheme } from './button';
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
  config,
  baseStyle: {},
  fonts: {
    //heading: 'var(--font-fondamento)',
    //body: 'var(--font-fondamento)',
  },
  components: {
    Button: buttonTheme,
    Container: containerTheme,
    Avatar: avatarTheme,
    Heading: headingTheme,
    Text: textTheme,
    Progress: progressTheme,
    Tooltip: tooltipTheme,
  },
});

export default fantasyTheme;
