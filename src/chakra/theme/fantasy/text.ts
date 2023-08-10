import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system';

const baseStyle = defineStyle({});

export const textTheme = defineStyleConfig({
  baseStyle,
  variants: {
    answerInstruction: {
      color: 'white',
      fontFamily: 'var(--font-fondamento)',
    },
    achievements: {
      color: 'white',
      fontFamily: 'var(--font-fondamento)',
    },
  },
});
