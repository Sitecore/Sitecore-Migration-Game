import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system';

const baseStyle = defineStyle({});

export const buttonTheme = defineStyleConfig({
  baseStyle,
  variants: {
    answer: {
      background: 'none',
      backgroundImage: '/fantasy/button-default.svg',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'auto auto',
      backgroundPosition: 'center center',
      verticalAlign: 'middle',
      textAlign: 'center',
      width: '300px',
      fontSize: '18px',
      paddingTop: '2px',
      marginBottom: '10px',
      display: 'inline-block',
      position: 'relative',
      color: 'white',
      _hover: {
        backgroundImage: '/fantasy/button-active.svg',
      },
    },
    answer2: {
      background: 'none',
      backgroundImage: '/fantasy/button-default.svg',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      verticalAlign: 'middle',
      textAlign: 'center',
      width: '250px',
      height: '40px',
      fontSize: '14px',
      paddingTop: '2px',
      marginBottom: '10px',
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
