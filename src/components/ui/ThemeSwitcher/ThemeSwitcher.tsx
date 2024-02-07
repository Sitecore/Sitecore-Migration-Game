import { ChakraProvider } from '@chakra-ui/react';
import { corporateTheme } from 'chakra/theme/corporate/theme';
import fantasyTheme from 'chakra/theme/fantasy/theme';
import { useEngageTracker } from 'components/Contexts';
import React, { FC, useState, createContext } from 'react';
import * as GTag from 'lib/GTag';

interface ThemeSwitcherProps {
  children: React.ReactNode;
}

export const ThemeSwitcher = createContext<ThemeSwitcherType>({} as ThemeSwitcherType);

export interface ThemeSwitcherType {
  changeTheme: (themeChoice: string) => void;
  currentTheme: string;
}

export const useThemeSwitcher = () => React.useContext(ThemeSwitcher);

export const ThemeSwitcherProvider: FC<ThemeSwitcherProps> = ({ children }) => {
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
    <ThemeSwitcher.Provider
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
    </ThemeSwitcher.Provider>
  );
};
