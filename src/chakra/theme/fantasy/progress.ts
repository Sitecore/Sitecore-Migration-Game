import { progressAnatomy as parts } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/styled-system';
import { mode } from '@chakra-ui/theme-tools';

const { defineMultiStyleConfig, definePartsStyle } = createMultiStyleConfigHelpers(parts.keys);

const filledStyle = defineStyle((props) => {
  const { colorScheme: c, theme: t, isIndeterminate, hasStripe } = props;

  const bgColor = mode(`${c}.500`, `${c}.200`)(props);

  const gradient = `linear(to bottom, green.200,blue.500,blue.500)
  )`;

  const addStripe = !isIndeterminate && hasStripe;

  return {
    ...(isIndeterminate ? { bgImage: gradient } : { bgColor }),
  };
});

const baseStyleTrack = defineStyle((props) => {
  return {
    bg: mode('gray.100', 'whiteAlpha.300')(props),
  };
});

const baseStyleFilledTrack = defineStyle((props) => {
  return {
    transitionProperty: 'common',
    transitionDuration: 'slow',
    bgGradient: 'linear(to bottom, #628A21,#A6E135,#446F1A)',
  };
});

const progressBar = definePartsStyle((props) => ({
  label: {},
  track: baseStyleTrack(props),
  filledTrack: baseStyleFilledTrack(props),
}));

export const progressTheme = defineMultiStyleConfig({
  variants: { progressBar },
});
