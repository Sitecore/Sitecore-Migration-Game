import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system';

const baseStyle = defineStyle({});

export const textTheme = defineStyleConfig({
  baseStyle,
  variants: {
    customFont: {
      color: 'white',
      fontFamily: 'var(--font-fondamento)',
    },
  },
});
