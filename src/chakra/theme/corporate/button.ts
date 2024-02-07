import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system';

const baseStyle = defineStyle({});

export const buttonTheme = defineStyleConfig({
  baseStyle: {
    whiteSpace: 'normal',
    wordBreak: 'break-word',
  },
  variants: {
    avatar: {
      borderRadius: '50%',
      boxShadow: '0 4px 15px 0 rgba(45, 54, 65, 0.5)',
      _active: {
        boxShadow: '0 0 5px 5px #5548D9',
      },
    },
  },
});
