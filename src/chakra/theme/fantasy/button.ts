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
      backgroundImage: '/fantasy/icon-button-default.svg',
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
      _hover: {
        boxShadow: '1px 1px 25px 10px rgba(146, 148, 248, 0.4)',
        _before: {
          left: '100%',
        },
      },
      _before: {
        content: `''`,
        position: 'absolute',
        top: 0,
        left: '-100%',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(120deg,transparent,rgba(146, 148, 248, 0.4),transparent)',
        transition: 'all 650ms',
      },
      _active: {
        backgroundImage: 'linear-gradient(90deg, rgba(41,50,60,1) 0%, rgba(38,152,31,1) 50%, rgba(78,67,118,1) 100%)',
      },
    },
  },
});
