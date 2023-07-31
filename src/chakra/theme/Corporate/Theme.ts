import { extendTheme } from '@chakra-ui/react';
import { buttonTheme } from './button';

const CorporateTheme = extendTheme({
  baseStyle: {},
  components: { Button: buttonTheme },
});

export default CorporateTheme;
