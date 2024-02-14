import React from 'react'
import { Menu, MenuButton, MenuItem, MenuList, Button, Tooltip } from '@chakra-ui/react';
import { useThemeContext } from 'components/Contexts/ThemeContext/ThemeContext';
import { MdColorLens } from "react-icons/md";

export default function () {

  const themeContext = useThemeContext();

  return (
    <>
      <Menu>
        <Tooltip label="Change Theme" aria-label="Change Theme">
          <MenuButton colorScheme='neutral' variant="solid" as={Button}>
            <MdColorLens />
          </MenuButton>
        </Tooltip>
        <MenuList>
          <MenuItem onClick={() => themeContext.changeTheme('corporate')}>Corporate</MenuItem>
          <MenuItem onClick={() => themeContext.changeTheme('fantasy')}>👑 Fantasy</MenuItem>
        </MenuList>
      </Menu>
    </>
  )
}
