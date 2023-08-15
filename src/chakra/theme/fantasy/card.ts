import { cardAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(cardAnatomy.keys);

const questionCard = definePartsStyle({
  container: {
    background: 'none',
    backgroundImage: '/fantasy/panel.svg',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    fontFamily: 'var(--font-fondamento)',
    color: 'white',
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
  variants: { questionCard, unstyled },
});
