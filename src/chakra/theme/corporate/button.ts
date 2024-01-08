import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system';

const baseStyle = defineStyle({});

export const buttonTheme = defineStyleConfig({
  baseStyle: {
    whiteSpace: 'normal',
    wordBreak: 'break-word',
  },
});
