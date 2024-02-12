import { ChakraProvider } from '@chakra-ui/react';
import { corporateTheme } from 'chakra/theme/corporate/theme';
import fantasyTheme from 'chakra/theme/fantasy/theme';
import { useEngageTracker } from 'components/Contexts';
import * as GTag from 'lib/GTag';
import React, { FC, createContext, useState } from 'react';

interface ThemeContextProps {
  children: React.ReactNode;
}

export const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export interface ThemeContextType {
  changeTheme: (themeChoice: string) => void;
  currentTheme: string;
}

export const useThemeContext = () => React.useContext(ThemeContext);

export const ThemeProvider: FC<ThemeContextProps> = ({ children }) => {
  const tracker = useEngageTracker();

  const themes = {
    "corporate": corporateTheme,
    "fantasy": fantasyTheme
  };

  const [themeName, setThemeName] = useState<string>("corporate");

  const changeTheme = async (themeChoice: string) => {
    await tracker.TrackEvent('THEME_CHANGE', { theme: themeChoice });
    GTag.event('theme_change', 'Theme', themeChoice);

    setThemeName(themeChoice);
  }

  const currentTheme = () => {
    return themeName;
  }

  const theme = themes[themeName as keyof typeof themes];

  return (
    <ThemeContext.Provider
      value={{
        changeTheme: (themeChoice: string) => {
          changeTheme(themeChoice);
        },
        currentTheme: currentTheme()
      }}
    >
      <ChakraProvider theme={theme}>
        {children}
      </ChakraProvider>
    </ThemeContext.Provider>
  );
};
