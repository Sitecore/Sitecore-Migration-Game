import { Box, Button, Center, Heading, SimpleGrid } from '@chakra-ui/react';
import { IImage } from 'models';
import { FC } from 'react';

interface AvatarGalleryProps {
  avatars: IImage[] | undefined;
  toggledAvatarId: string | undefined;
  handleAvatarChange: (avatar: IImage) => void;
  classStyles: any;
}

export const AvatarGallery: FC<AvatarGalleryProps> = ({ avatars, toggledAvatarId, handleAvatarChange }) => {
  return (
    <>
      <Box margin={10}>
        <Center>
          <Heading variant={'gameTitle'} order={3}>
            Select Your Avatar:
          </Heading>
        </Center>
        <SimpleGrid mt={10} minChildWidth="120px" spacing="20px">
          {avatars?.map((avatar, i) => {
            const isToggled = avatar.id === toggledAvatarId;
            return (
              <Center>
                <Box>
                  {avatar !== undefined && (
                    <Button
                      key={avatar.id}
                      onClick={() => handleAvatarChange(avatar)}
                      backgroundImage={`${avatar.fileUrl}?transform=true&width=100&height=100&fit=crop&gravity=auto`}
                      backgroundSize={'contain'}
                      border={isToggled ? `3px solid #4a28d9` : 'none'}
                      shadow={'md'}
                      width={100}
                      height={100}
                      isActive={isToggled}
                      variant={isToggled ? 'avatarSelected' : 'avatar'}
                    />
                  )}
                </Box>
              </Center>
            );
          })}
        </SimpleGrid>
      </Box>
    </>
  );
};
