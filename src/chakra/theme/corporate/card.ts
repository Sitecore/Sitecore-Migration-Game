import { cardAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(cardAnatomy.keys);

const variants = {
  blurred: definePartsStyle({
    container: {
      shadow: 'base',
      backdropFilter: 'blur(24px)',
      background: 'whiteAlpha.300',
      borderRadius: '3xl',
      color: 'chakra-body-text',
      _dark: {
        background: 'blackAlpha.300',
        shadow: 'dark-lg',
      },
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
  }),
};

export const cardTheme = defineMultiStyleConfig({ variants });
