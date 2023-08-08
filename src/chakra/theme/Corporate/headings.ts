import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system';

const baseStyle = defineStyle({});

export const headingTheme = defineStyleConfig({
  baseStyle,
  variants: {
    userName: {
      background: 'none',
      //backgroundImage: '/fantasy/banner.svg',
      backgroundRepeat: 'no-repeat',
      //fontFamily: 'var(--font-fondamento)',
      width: '270px',
      height: '270px',
      position: 'relative',
      top: '75px',
      textAlign: 'center',
      paddingTop: '2',
      color: 'white',
    },
    gameTitle: {
      fontWeight: 600,
      marginTop: 10,
      letterSpacing: '0.25em',
      textTransform: 'uppercase',
      textShadow: '1px 1px 0px #fff, 2px 2px 0px rgba(0, 0, 0, 0.5)',
      color: '#2c2c2c',
    },
  },
});
