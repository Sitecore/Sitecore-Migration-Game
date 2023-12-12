import { Box, Button, Center, Heading, SimpleGrid } from '@chakra-ui/react';
import { IImage } from 'models';
import { FC } from 'react';

interface AvatarGalleryProps {
  avatars: IImage[] | undefined;
  toggledAvatarId: string | undefined;
  handleAvatarChange: (avatar: IImage) => void;
}

export const AvatarGallery: FC<AvatarGalleryProps> = ({ avatars, toggledAvatarId, handleAvatarChange }) => {
  return (
    <>
      <Box marginTop={[10]} marginX={[0, 20]}>
        <Center>
          <Heading variant={'gameTitle'} size={{ base: 'md', xl: 'xl' }} order={3}>
            Select Your Avatar:
          </Heading>
        </Center>
        <SimpleGrid mt={10} minChildWidth={['60px', '120px']} spacing={['15px', '15px', '20px']}>
          {avatars?.map((avatar, i) => {
            const isToggled = avatar.id === toggledAvatarId;
            return (
              <Box key={i} width={['80px', '80px', '100px']}>
                {avatar !== undefined && (
                  <Button
                    key={avatar.id}
                    onClick={() => handleAvatarChange(avatar)}
                    backgroundImage={`${avatar.fileUrl}?transform=true&width=80&height=80&fit=crop&gravity=auto`}
                    backgroundSize={'cover'}
                    shadow={'md'}
                    width={['60px', '80px', '100px']}
                    height={['60px', '80px', '100px']}
                    boxShadow={isToggled ? '0 0 5px 5px #5548D9' : '0 4px 15px 0 rgba(45, 54, 65, 0.5)'}
                    isActive={avatar.id === toggledAvatarId}
                    variant={'avatar'}
                  />
                )}
              </Box>
            );
          })}
        </SimpleGrid>
      </Box>
    </>
  );
};
