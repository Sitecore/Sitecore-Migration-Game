import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system';

const baseStyle = defineStyle({
  px: '4',
  py: '4',
  fontWeight: 'medium',
  fontSize: 'sm',
  boxShadow: 'md',
  zIndex: 'tooltip',
  fontFamily: 'var(--font-fondamento)',
  background: 'none',
  height: '100%',
  width: 'auto',
  textAlign: 'center',
  verticalAlign: 'middle',
  backgroundImage: '/fantasy/tooltip.svg',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain',
  fontcolor: 'black'
});

export const tooltipTheme = defineStyleConfig({
  baseStyle,
});
