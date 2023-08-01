import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system';

const baseStyle = defineStyle({});

export const buttonTheme = defineStyleConfig({
  baseStyle,
  variants: {
    answer: {
      background: 'none',
      backgroundImage: '/fantasy/button-default.svg',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      verticalAlign: 'middle',
      textAlign: 'center',
      width: '100%',
      fontSize: '18px',
      paddingTop: '2px',
      display: 'inline-block',
      position: 'relative',
      color: 'white',
      _hover: {
        backgroundImage: '/fantasy/button-active.svg',
      },
    },
    answer2: {
      background: 'none',
      //backgroundImage: '/fantasy/button-default.svg',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'length',
      verticalAlign: 'middle',
      textAlign: 'center',

      fontSize: '18px',
      paddingTop: '2px',
      display: 'inline-block',
      position: 'relative',
      color: 'white',
      _hover: {
        backgroundImage: '/fantasy/button-active.svg',
      },
    },
    submit: {
      background: 'none',
      backgroundImage: '/fantasy/submit-button-default.svg',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      verticalAlign: 'middle',
      textAlign: 'center',
      height: '60px',
      width: '180px',
      paddingTop: '2px',
      fontSize: '18px',
      display: 'inline-block',
      color: 'white',
    },
  },
});
