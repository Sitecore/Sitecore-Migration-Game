import { AbsoluteCenter, Avatar, Card, Center, Container, Heading, Spacer, VStack } from '@chakra-ui/react';
import { useGameInfoContext } from 'components/Contexts';

interface AvatarDisplayProps {
  fileUrl: string;
  name: string;
}

export default function AvatarDisplay({ fileUrl, name }: AvatarDisplayProps) {
  const gameInfoContext = useGameInfoContext();

  return (
    <VStack mb={[1, 8]}>
      <Container variant={'userProfilePicture'} width={{ base: '80px', md: '200px' }}>
        <Center>
          <Avatar
            width={['90%', '97%', '97%']}
            height={['90%', '97%', '97%']}
            src={fileUrl}
            name="User Avatar"
            marginTop={['1px', '3px']}
          />
        </Center>
      </Container>
      <Spacer />
      <Card
        width="100%"
        height="50px"
        position="relative"
        variant="avatarDisplay"
      >
        <AbsoluteCenter axis="both">
          <Heading size="sm" variant={'userName'}>
            <Center>{name}</Center>
          </Heading>
        </AbsoluteCenter>
      </Card>
    </VStack>
  );
}
