import { AbsoluteCenter, Avatar, Card, Center, Container, Heading, Show, VStack } from '@chakra-ui/react';

interface AvatarDisplayProps {
  fileUrl: string;
  name: string;
}

export default function AvatarDisplay({ fileUrl, name }: AvatarDisplayProps) {
  return (
    <VStack mb={8}>
      <Show above="991px">
        <Container variant={'userProfilePicture'}>
          <Center>
            <Avatar width="200px" height="200px" src={fileUrl} name="User Avatar" />
          </Center>
        </Container>
      </Show>
      <Show below="991px">
        <Avatar width="150px" height="150px" src={fileUrl} name="User Avatar" />
      </Show>

      <Card width="100%" height="50px" position="relative" variant={'unstyled'}>
        <AbsoluteCenter axis="both">
          <Heading size="md" variant={'userName'}>
            {name}
          </Heading>
        </AbsoluteCenter>
      </Card>
    </VStack>
  );
}
