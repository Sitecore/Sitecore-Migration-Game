import { Theme, extendTheme } from '@chakra-ui/react';
import { buttonTheme } from './button';

const CorporateTheme: Theme = extendTheme({
  baseStyle: {},
  components: { Button: buttonTheme },
});

export default CorporateTheme;
