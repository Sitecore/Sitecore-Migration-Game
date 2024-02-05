import { cardAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(cardAnatomy.keys);


const elevated = definePartsStyle({
  container: {
    //backdropFilter: { base: 'blur(24px)' },
    backgroundColor: { base: '#00000090' },
    fontFamily: 'var(--font-fondamento)',
    color: 'white',
    //opacity: { base: '0.2', xl: '1' },
  },
  header: {
    color: 'chakra-body-text',
    _dark: {},
  },
  body: {
    color: 'chakra-body-text',
    _dark: {},
  },
  footer: {
    color: 'chakra-body-text',
    _dark: {},
  },
});

const unstyled = definePartsStyle({
  container: {
    background: 'none',
  },
  header: {
    color: 'chakra-body-text',
    _dark: {},
  },
  body: {
    color: 'chakra-body-text',
    _dark: {},
  },
  footer: {
    color: 'chakra-body-text',
    _dark: {},
  },
});

const charcoal = definePartsStyle({
  container: {
    shadow: 'base',
    background: '#545859',
    borderRadius: '3xl',
    color: 'white',
  },
  header: {
    color: 'chakra-body-text',
    _dark: {},
  },
  body: {
    color: 'chakra-body-text',
    _dark: {},
  },
  footer: {
    color: 'chakra-body-text',
    _dark: {},
  },
});

export const cardTheme = defineMultiStyleConfig({
  variants: { elevated, unstyled, charcoal },
});
