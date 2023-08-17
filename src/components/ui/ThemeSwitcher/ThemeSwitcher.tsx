import { ChakraProvider, ChakraTheme } from '@chakra-ui/react';
import sitecoreTheme from '@sitecore/blok-theme';
import fantasyTheme from 'chakra/theme/fantasy/theme';
import { useGameInfoContext } from 'components/Contexts';
import { FC, useEffect, useState } from 'react';

interface ThemeSwitcherProps {
  children: React.ReactNode;
}

export const ThemeSwitcher: FC<ThemeSwitcherProps> = ({ children }) => {
  const gameInfoContext = useGameInfoContext();
  const [theme, setTheme] = useState<ChakraTheme | Record<string, any>>(sitecoreTheme);

  useEffect(() => {
    if (gameInfoContext?.theme?.chakraTheme == 'fantasy') {
      setTheme(fantasyTheme);
    } else if (gameInfoContext?.theme?.chakraTheme == 'corporate') {
      setTheme(sitecoreTheme);
    }
  }, [gameInfoContext?.theme]);

  return (
    <>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </>
  );
};
