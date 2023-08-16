import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system';

const baseStyle = defineStyle({});

export const containerTheme = defineStyleConfig({
  baseStyle,
  variants: {
    questionPanel: {
      background: 'none',
      backgroundImage: { base: '', md: '/fantasy/panel.svg' },
      backgroundColor: { base: '#313a46', md: 'transparent' },
      borderRadius: 'lg',
      opacity: { base: '0.8', xl: '1' },
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      fontFamily: 'var(--font-fondamento)',
      color: 'white',
    },
    userProfilePicture: {
      background: 'none',
      backgroundImage: '/fantasy/profile-picture.svg',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'contain',
      width: { base: '100%', md: '100%' },
      textAlign: 'center',
      padding: { base: '5px', md: '15px' },
      paddingTop: { base: '1px', md: '5px' },
      fontFamily: 'var(--font-fondamento)',
    },
    progressBar: {
      background: 'none',
      backgroundImage: '/fantasy/progress.svg',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      paddingLeft: '10px',
      paddingRight: '10px',
      paddingTop: { base: '0px', xl: '6px' },
      paddingBottom: '0px',
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
