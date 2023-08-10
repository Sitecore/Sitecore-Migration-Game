import { AbsoluteCenter, Avatar, Box, Container, Heading, Show, VStack } from '@chakra-ui/react';

interface AvatarDisplayProps {
  fileUrl: string;
  name: string;
}

export default function AvatarDisplay({ fileUrl, name }: AvatarDisplayProps) {
  return (
    <VStack mb={8}>
      <Show above="991px">
        <Container variant={'userProfilePicture'}>
          <Avatar width="200px" height="200px" src={fileUrl} name="User Avatar" />
        </Container>
      </Show>
      <Show below="991px">
        <Avatar width="150px" height="150px" src={fileUrl} name="User Avatar" />
      </Show>

      <Box width="100%" height="50px" position="relative">
        <AbsoluteCenter axis="both">
          <Heading size="md" variant={'userName'}>
            {name}
          </Heading>
        </AbsoluteCenter>
      </Box>
    </VStack>
  );
}
