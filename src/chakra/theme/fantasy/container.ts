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
      fontFamily: 'var(--font-fondamento)',
    },
    userProfilePicture: {
      background: 'none',
      backgroundImage: '/fantasy/profile-picture.svg',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      width: '259px',
      textAlign: 'center',
      paddingTop: '15px',
      fontFamily: 'var(--font-fondamento)',
    },
    progressBar: {
      background: 'none',
      backgroundImage: '/fantasy/progress.svg',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      paddingLeft: '10px',
      paddingRight: '10px',
      paddingTop: '6px',
      paddingBottom: '10px',
      fontFamily: 'var(--font-fondamento)',
    },
  },
});
