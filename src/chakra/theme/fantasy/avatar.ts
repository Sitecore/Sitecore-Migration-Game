import { avatarAnatomy } from '@chakra-ui/anatomy';
import { createMultiStyleConfigHelpers } from '@chakra-ui/react';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(avatarAnatomy.keys);

const userProfilePicture = definePartsStyle({
  badge: {},
  container: {
    background: 'none',
    backgroundImage: '/fantasy/profile-picture.svg',
    backgroundRepeat: 'no-repeat',
    width: '270px',
    height: '270px',
    position: 'relative',
  },
  excessLabel: {
    // let's also provide dark mode alternatives
    _dark: {},
  },
});

export const avatarTheme = defineMultiStyleConfig({
  variants: { userProfilePicture },
});
