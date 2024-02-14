import React from 'react'
import { Select, Menu, MenuButton, MenuItem, MenuList, Button, Show } from '@chakra-ui/react';
import { useThemeContext } from 'components/Contexts/ThemeContext/ThemeContext';
import { ChevronDownIcon, ViewIcon } from '@chakra-ui/icons';

export default function () {

  const themeContext = useThemeContext();

  return (
    <>
      {/* <Select icon={<MdSave size={24} />} variant={'themeSelect'} mt={2} size={{ base: 'sm', lg: "md" }} onChange={(event) => themeContext.changeTheme(event.target.selectedOptions[0].value)}>
        <option selected hidden disabled value="">Theme</option>
        <option value='corporate'>Corporate</option>
        <option value='fantasy'>👑 Fantasy</option>
      </Select> */}
      <Menu>
        <MenuButton mt={2} colorScheme='neutral' variant="solid" as={Button} rightIcon={<ChevronDownIcon />} float={'right'} >
          <Show above='md'>
            Theme
          </Show>
          <Show below='md'>
            <ViewIcon />
          </Show>
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => themeContext.changeTheme('corporate')}>Corporate</MenuItem>
          <MenuItem onClick={() => themeContext.changeTheme('fantasy')}>👑 Fantasy</MenuItem>
        </MenuList>
      </Menu>
    </>
  )
}
