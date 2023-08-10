import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system';

const baseStyle = defineStyle({});

export const containerTheme = defineStyleConfig({
  baseStyle,
  variants: {
    questionPanel: {
      bg: 'white',
      rounded: 'lg',
      shadow: 'sm',
      boxShadow: '0 0 10px 0 rgba(0,0,0,.2), inset 0 0 200px rgba(255,255,255,.3)',
      backdropFilter: 'blur(24px)',
      background: '#f6f6f629',
    },
    userProfilePicture: {
      width: '259px',
      textAlign: 'center',
      paddingTop: '15px',
    },
    progressBar: {
      borderColor: 'chakra-border-color',
      paddingLeft: '10px',
      paddingRight: '10px',
      paddingTop: '6px',
      paddingBottom: '10px',
    },
    settingsPanel: {
      bg: 'white',
      rounded: 'lg',
      shadow: 'sm',
      boxShadow: '0 0 10px 0 rgba(0,0,0,.2), inset 0 0 200px rgba(255,255,255,.3)',
      backdropFilter: 'blur(24px)',
      background: '#f6f6f629',
    },
    outcome: {
      marginBottom: 4,
      padding: 8,
      background: '#C8C8C8',
      boxShadow: '0 0 10px 0 rgba(0,0,0,.2), inset 0 0 200px hsla(0,0%,100%,.3)',
      borderRadius: 'lg',
    },
  },
});
