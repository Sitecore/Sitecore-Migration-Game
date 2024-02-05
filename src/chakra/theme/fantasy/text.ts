import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system';

const baseStyle = defineStyle({});

export const textTheme = defineStyleConfig({
  baseStyle,
  variants: {
    customFont: {
      color: 'black',
      fontFamily: 'var(--font-fondamento)',
    },
    achievements: {
      color: 'black',
      fontFamily: 'var(--font-fondamento)',
    },
  },
});
