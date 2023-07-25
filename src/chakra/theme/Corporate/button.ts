import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const brandPrimary = defineStyle({
  background: 'orange.500',
});

export const buttonTheme = defineStyleConfig({
  variants: { brandPrimary },
});
