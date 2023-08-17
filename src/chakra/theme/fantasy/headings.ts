import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system';

const baseStyle = defineStyle({});

export const headingTheme = defineStyleConfig({
  baseStyle,
  variants: {
    userName: {
      fontSize: { base: 'sm', xl: 'md' },
      width: { base: '135px', xl: '270px' },
      height: { base: '50px', xl: '270px' },
      top: { base: '-20px', xl: '75px' },
      paddingTop: { base: '1', xl: '2' },
      background: 'none',
      backgroundImage: '/fantasy/banner.svg',
      backgroundRepeat: 'no-repeat',
      fontFamily: 'var(--font-fondamento)',
      position: 'relative',
      textAlign: 'center',
      color: 'white',
    },
    gameTitle: {
      fontSize: { base: 'sm', xl: 'md' },
      fontWeight: 600,
      letterSpacing: '0.25em',
      textTransform: 'uppercase',
      textShadow: '1px 1px 0px #fff, 2px 2px 0px rgba(0, 0, 0, 0.5)',
      color: '#2c2c2c',
    },
  },
});
//,