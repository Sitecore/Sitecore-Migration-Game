import { AbsoluteCenter, Avatar, Box, Heading, Show, VStack } from '@chakra-ui/react'
import React from 'react'

interface AvatarDisplayProps {
  fileUrl: string,
  name: string
}

export default function AvatarDisplay({fileUrl, name}: AvatarDisplayProps) {
  return (
    <VStack mb={8}>
    <Show above='991px'>
      <Avatar width="200px" height="200px" src={fileUrl} name="User Avatar" />
    </Show>
    <Show below='991px'>
      <Avatar width="150px" height="150px" src={fileUrl} name="User Avatar" />
    </Show>

    <Box
      backgroundColor="white"
      width="100%"
      height="50px"
      position="relative"
      boxShadow="0 8px 16px 0 rgba(84,88,89,.4)"
    >
      <AbsoluteCenter axis="both">
        <Heading size="md">{name}</Heading>
      </AbsoluteCenter>
    </Box>
  </VStack>
  )
}
