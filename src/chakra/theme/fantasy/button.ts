import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system';
import { keyframes } from '@emotion/react';

const baseStyle = defineStyle({});

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 var(--hover)
  `;

export const buttonTheme = defineStyleConfig({
  baseStyle,
  variants: {
    solid: {
      background: 'none',
      backgroundImage: '/fantasy/button-default.svg',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'auto auto',
      backgroundPosition: 'center center',
      verticalAlign: 'middle',
      textAlign: 'center',
      minWidth: '240px',
      fontFamily: 'var(--font-fondamento)',
      fontSize: '16px',
      paddingTop: '2px',
      //display: 'inline-block',
      position: 'relative',
      color: 'white',

      _active: {
        background: 'none',
        backgroundImage: '/fantasy/button-active.svg',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'auto auto',
        backgroundPosition: 'center center',
      },
      _hover: {
        background: 'none',
        backgroundImage: '/fantasy/button-active.svg',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'auto auto',
        backgroundPosition: 'center center',
      },
    },
    outline: {
      background: 'none',
      border: 'none',
      backgroundImage: {
        base: '/fantasy/button/button-wide-300.svg',
        md: '/fantasy/button-default.svg',
        xl: '/fantasy/button/button-wide-300.svg',
      },
      //backgroundImage: '/fantasy/button-default.svg',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'auto auto',
      backgroundPosition: 'center center',
      verticalAlign: 'middle',
      textAlign: 'center',
      fontFamily: 'var(--font-fondamento)',
      fontSize: '16px',
      paddingTop: '2px',
      display: 'inline-block',
      position: 'relative',
      color: 'white',
      _active: {
        background: 'transparent',
        backgroundImage: {
          base: '/fantasy/button/button-wide-300-active.svg',
          md: '/fantasy/button-active.svg',
          xl: '/fantasy/button/button-wide-300-active.svg',
        },
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'auto auto',
        backgroundPosition: 'center center',
      },
      _hover: {
        background: 'none',
        backgroundImage: '/fantasy/button-active.svg',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'auto auto',
        backgroundPosition: 'center center',
      },
    },
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
    answer2: {
      background: 'none',
      backgroundImage: '/fantasy/button-default.svg',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      verticalAlign: 'middle',
      textAlign: 'center',
      width: '250px',
      height: '40px',
      fontFamily: 'var(--font-fondamento)',
      fontSize: '14px',
      paddingTop: '2px',
      marginBottom: '10px',
      display: 'inline-block',
      position: 'relative',
      color: 'white',
      _hover: {
        backgroundImage: '/fantasy/button-active.svg',
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
    iconButton: {
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
    avatar: {
      boxShadow: '0 0 2px 2px rgba(0,0,0,0.5)',
      margin: '5px',
      width: '80px',
      padding: '0',
      _hover: {
        boxShadow: '0 0 2px 2px #5548D9',
      },
      _active: {
        backgroundColor: 'transparent',
        boxShadow: '0 0 5px 5px #5548D9',
      },
    },
    role: {
      transition: 'all .4s ease-in-out',
      MozTransition: 'all .4s ease-in-out',
      WebkitTransition: 'all .4s ease-in-out',
      OTransition: 'all .4s ease-in-out',
      backgroundImage: 'linear-gradient(to right, #485563, #2b5876, #4e4376)',
      backgroundSize: '300% 100%',
      boxShadow: '0 4px 15px 0 rgba(45, 54, 65, 0.5)',
      color: '#ffffff',
      borderRadius: '15px',
      _hover: {
        backgroundPosition: '100% 0',
        transition: 'all .4s ease-in-out',
        MozTransition: 'all .4s ease-in-out',
        WebkitTransition: 'all .4s ease-in-out',
        OTransition: 'all .4s ease-in-out',
        boxShadow: '0 4px 15px 0 #5548D9',
      },
    },
    roleSelected: {
      transition: 'all .4s ease-in-out',
      MozTransition: 'all .4s ease-in-out',
      WebkitTransition: 'all .4s ease-in-out',
      OTransition: 'all .4s ease-in-out',
      backgroundImage: 'linear-gradient(to right, #29323c, #485563, #2b5876, #4e4376)',
      backgroundSize: '300% 100%',
      boxShadow: '0 0 5px 5px #5548D9',
      color: '#ffffff',
      borderRadius: '5px',
      backgroundPosition: '100% 0',
      //border: '5px solid red',
    },
    solid1: {
      transition: 'all .4s ease-in-out',
      MozTransition: 'all .4s ease-in-out',
      WebkitTransition: 'all .4s ease-in-out',
      OTransition: 'all .4s ease-in-out',
      overflow: 'hidden',
      backgroundImage: 'linear-gradient(to right, #29323c, #485563, #2b5876, #4e4376)',
      backgroundSize: '300% 100%',
      boxShadow: '0 4px 15px 0 rgba(45, 54, 65, 0.75)',
      color: '#ffffff',
      borderRadius: '5px',
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
    },
    solid2: {
      backgroundImage: 'linear-gradient(to right, #29323c, #485563, #2b5876, #4e4376)',
      backgroundSize: '300% 100%',
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
    },
  },
});
