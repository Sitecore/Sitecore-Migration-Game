import { ChakraProvider, ChakraTheme, extendTheme } from '@chakra-ui/react';
import { withProse } from '@nikolovlazar/chakra-ui-prose';
import sitecoreTheme from '@sitecore/blok-theme';
import { buttonOverride } from 'chakra/theme/corporate/button';
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
      setTheme(
        extendTheme(
          fantasyTheme,
          withProse({
            baseStyle: {
              p: {
                fontFamily: 'inherit',
              },
            },
          })
        )
      );
    } else if (gameInfoContext?.theme?.chakraTheme == 'corporate') {
      setTheme(extendTheme(sitecoreTheme, buttonOverride, withProse()));
    }
  }, [gameInfoContext?.theme]);

  return (
    <>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </>
  );
};
