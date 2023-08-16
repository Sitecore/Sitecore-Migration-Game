import { cardAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(cardAnatomy.keys);

const elevated = definePartsStyle({
  container: {
    backdropFilter: { base: 'blur(24px)', md: 'none' },
    backgroundColor: { base: '#00000070', md: 'transparent' },
    backgroundImage: { base: 'none', md: '/fantasy/panel.svg' },
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    fontFamily: 'var(--font-fondamento)',
    color: 'white',
    //opacity: { base: '0.2', xl: '1' },
  },
  header: {},
  body: {},
  footer: {},
});

const unstyled = definePartsStyle({
  container: {
    background: 'none',
  },
  header: {},
  body: {},
  footer: {},
});

export const cardTheme = defineMultiStyleConfig({
  variants: { elevated, unstyled },
});
