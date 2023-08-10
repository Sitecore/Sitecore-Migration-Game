import { ChakraProvider } from '@chakra-ui/react';
import sitecoreTheme from '@sitecore/blok-theme';
import corporateTheme from 'chakra/theme/corporate/theme';
import fantasyTheme from 'chakra/theme/fantasy/theme';
import { FC, useEffect, useState } from 'react';
import { useGameInfoContext } from '..';

interface ThemeSwitcherProps {
  children: React.ReactNode;
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ children }) => {
  const gameInfoContext = useGameInfoContext();
  const [theme, setTheme] = useState(corporateTheme);

  useEffect(() => {
    if (gameInfoContext?.theme?.id == 'a5F4KpHzIkO1Re9iHmJjWA') {
      setTheme(fantasyTheme);
    } else if (gameInfoContext?.theme?.id == '-e_W0k2zO0uZPNBmYtorCQ') {
      setTheme(sitecoreTheme);
    }
  }, [gameInfoContext?.theme]);

  return (
    <>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </>
  );
};
