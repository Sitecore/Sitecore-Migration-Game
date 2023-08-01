import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system';

const baseStyle = defineStyle({});

export const headingTheme = defineStyleConfig({
  baseStyle,
  variants: {
    userName: {
      background: 'none',
      backgroundImage: '/fantasy/banner.svg',
      backgroundRepeat: 'no-repeat',
      width: '270px',
      height: '270px',
      position: 'relative',
      top: '75px',
      textAlign: 'center',
      paddingTop: '2',
      color: 'white',
    },
  },
});
