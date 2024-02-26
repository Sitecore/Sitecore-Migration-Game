import { selectAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(selectAnatomy.keys)

const variants = {
  themeSelect: definePartsStyle({
    field: {
      background: '#545859',
      color: 'white',
      '& > option': {
        background: '#545859',
        color: 'white',
      },
      fontFamily: 'var(--font-fondamento)',
    },
    icon: {
      color: 'white',
    },

  }),
}

export const selectTheme = defineMultiStyleConfig({ variants })
