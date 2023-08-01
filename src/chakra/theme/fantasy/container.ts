import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system';

const baseStyle = defineStyle({});

export const containerTheme = defineStyleConfig({
  baseStyle,
  variants: {
    questionPanel: {
      background: 'none',
      backgroundImage: '/fantasy/panel.svg',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
    },
    userProfilePicture: {
      background: 'none',
      backgroundImage: '/fantasy/profile-picture.svg',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      width: '259px',
      textAlign: 'center',
      paddingTop: '15px',
    },
  },
});
