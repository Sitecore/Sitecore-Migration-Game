import { ChakraProvider } from '@chakra-ui/react';
import { corporateTheme } from 'chakra/theme/corporate/theme';
import fantasyTheme from 'chakra/theme/fantasy/theme';
import React, { FC, useState, createContext } from 'react';

interface ThemeSwitcherProps {
  children: React.ReactNode;
}

export const ThemeSwitcher = createContext<ThemeSwitcherType>({} as ThemeSwitcherType);

export interface ThemeSwitcherType {
  changeTheme: (themeChoice: string) => void;
}

export const useThemeSwitcher = () => React.useContext(ThemeSwitcher);


export const ThemeSwitcherProvider: FC<ThemeSwitcherProps> = ({ children }) => {
  const themes = {
    "corporate": corporateTheme,
    "fantasy": fantasyTheme
  };

  const [themeName, setThemeName] = useState<string>("corporate");

  const changeTheme = (themeChoice: string) => {
    setThemeName(themeChoice);
  }

  const currentTheme = themes[themeName as keyof typeof themes];

  return (
    <ThemeSwitcher.Provider
      value={{
        changeTheme: (themeChoice: string) => {
          changeTheme(themeChoice);
        },
      }}
    >
      <ChakraProvider theme={currentTheme}>
        {children}
      </ChakraProvider>
    </ThemeSwitcher.Provider>
  );
};
