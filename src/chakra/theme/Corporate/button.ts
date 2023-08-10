import { defineStyle, defineStyleConfig } from '@chakra-ui/styled-system';

const baseStyle = defineStyle({});

export const buttonTheme = defineStyleConfig({
  baseStyle,
  variants: {
    answer: {
      background: 'primary.500',
      verticalAlign: 'middle',
      textAlign: 'center',
      fontSize: '16px',
      borderRadius: 'full',
      marginBottom: '10px',
      display: 'inline-block',
      position: 'relative',
      color: 'white',
      _hover: {
        background: 'primary.900',
      },
    },
    answer2: {
      background: 'primary.500',
      verticalAlign: 'middle',
      textAlign: 'center',
      width: '250px',
      height: '40px',
      fontSize: '14px',
      borderRadius: 'full',
      marginBottom: '10px',
      display: 'inline-block',
      position: 'relative',
      color: 'white',
      _hover: {
        background: 'primary.900',
      },
    },
    submit: {
      background: 'success.500',
      verticalAlign: 'middle',
      textAlign: 'center',

      borderRadius: 'full',
      paddingLeft: '16px',
      paddingRight: '16px',
      fontSize: '14px',
      display: 'inline-block',
      color: 'white',
      _hover: {
        background: 'success.900',
      },
    },
    iconButton: {
      background: 'primary.500',
      verticalAlign: 'middle',
      textAlign: 'center',
      position: 'relative',
      borderRadius: 'full',
      color: 'white',
      _hover: {
        background: 'primary.900',
      },
    },
    avatar: {
      boxShadow: '0 0 2px 2px rgba(0,0,0,0.5)',
      _hover: {
        boxShadow: '0 0 2px 2px #5548D9',
      },
    },
    avatarSelected: {
      backgroundColor: 'transparent',
      boxShadow: '0 0 5px 5px #5548D9',
      //border: '5px solid red',
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
      borderRadius: '5px',
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
    continue: {
      transition: 'all .4s ease-in-out',
      MozTransition: 'all .4s ease-in-out',
      WebkitTransition: 'all .4s ease-in-out',
      OTransition: 'all .4s ease-in-out',
      backgroundImage: 'linear-gradient(to right, #29323c, #485563, #2b5876, #4e4376)',
      backgroundSize: '300% 100%',
      boxShadow: '0 4px 15px 0 rgba(45, 54, 65, 0.75)',
      color: '#ffffff',
      borderRadius: '5px',
      _hover: {
        backgroundPosition: '100% 0',
        transition: 'all .4s ease-in-out',
        MozTransition: 'all .4s ease-in-out',
        WebkitTransition: 'all .4s ease-in-out',
        OTransition: 'all .4s ease-in-out',
      },
    },
    continue2: {
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
