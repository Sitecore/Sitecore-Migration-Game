import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system';

const baseStyle = defineStyle({});

export const buttonTheme = defineStyleConfig({
  baseStyle,
  variants: {
    answer: {
      background: 'primary.500',
      verticalAlign: 'middle',
      textAlign: 'center',
      fontSize: '16px',
      borderRadius: 'full',
      marginBottom: '10px',
      display: 'inline-block',
      position: 'relative',
      color: 'white',
      _hover: {
        background: 'primary.900',
      },
    },
    answer2: {
      background: 'primary.500',
      verticalAlign: 'middle',
      textAlign: 'center',
      width: '250px',
      height: '40px',
      fontSize: '14px',
      borderRadius: 'full',
      marginBottom: '10px',
      display: 'inline-block',
      position: 'relative',
      color: 'white',
      _hover: {
        background: 'primary.900',
      },
    },
    submit: {
      background: 'success.500',
      verticalAlign: 'middle',
      textAlign: 'center',

      borderRadius: 'full',
      paddingLeft: '16px',
      paddingRight: '16px',
      fontSize: '14px',
      display: 'inline-block',
      color: 'white',
      _hover: {
        background: 'success.900',
      },
    },
    iconButton: {
      background: 'primary.500',
      verticalAlign: 'middle',
      textAlign: 'center',
      position: 'relative',
      borderRadius: 'full',
      color: 'white',
      _hover: {
        background: 'primary.900',
      },
    },
  },
});
