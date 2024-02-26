import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system';
import { keyframes } from '@emotion/react';

const baseStyle = defineStyle({});

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 var(--hover)
  `;

export const buttonTheme = defineStyleConfig({
  baseStyle: {
    whiteSpace: 'normal',
    wordBreak: 'break-word',
  },
  variants: {
    iconOnly: {
      background: 'none',
      //backgroundImage: '/fantasy/icon-button-default.svg',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      backgroundPosition: 'center center',
      verticalAlign: 'middle',
      textAlign: 'center',
      position: 'relative',
      color: 'white',
      fontFamily: 'var(--font-fondamento)',
      _hover: {
        backgroundImage: '/fantasy/icon-button-active.svg',
      },
    },
    submit: {
      background: 'none',
      backgroundImage: '/fantasy/submit-button-default.svg',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      verticalAlign: 'middle',
      textAlign: 'center',
      height: '60px',
      width: '180px',
      paddingTop: '2px',
      fontFamily: 'var(--font-fondamento)',
      fontSize: '18px',
      display: 'inline-block',
      color: 'white',
    },
    solid: {
      backgroundImage: 'linear-gradient(90deg, rgba(41,50,60,1) 0%, rgba(72,85,99,1) 50%, rgba(78,67,118,1) 100%)',
      overflow: 'hidden',
      color: '#ffffff',
      position: 'relative',
      background: '#522d5b',
      fontFamily: 'var(--font-fondamento)',
      paddingX: '1.5em',
      clipPath: 'polygon(5% 50%,10% 0,90% 0,95% 50%,90% 90%,90% 90%,5% 90%,10% 90%,5% 50%)',
      _hover: {
        backgroundImage: 'linear-gradient(90deg, rgba(41,50,60,1) 0%, rgba(38,152,31,.6) 50%, rgba(78,67,118,1) 100%)',
      },
      _active: {
        backgroundImage: 'linear-gradient(90deg, rgba(41,50,60,1) 0%, rgba(38,152,31,1) 50%, rgba(78,67,118,1) 100%)',
      },
    },
    avatar: {
      borderRadius: '50%',
      boxShadow: '0 4px 15px 0 rgba(45, 54, 65, 0.5)',
      _active: {
        borderColor: '#522d5b',
        borderWidth: '4px',
        borderStyle: 'outset',
        boxShadow: '0 0 5px 5px #26981f',
      },
    },
  },
});
