import React from 'react'
import { Select, Text, Show } from '@chakra-ui/react';
import { useThemeContext } from 'components/Contexts/ThemeContext/ThemeContext';

export default function () {

  const themeContext = useThemeContext();

  return (
    <>
      <Select variant={'themeSelect'} mt={2} size={{base: 'sm', lg: "md"}} onChange={(event) => themeContext.changeTheme(event.target.selectedOptions[0].value)}>
        <option selected hidden disabled value="">Theme</option>
        <option value='corporate'>Corporate</option>
        <option value='fantasy'>👑 Fantasy</option>
      </Select>
    </>
  )
}
