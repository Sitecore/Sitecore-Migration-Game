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
              <Box>
                {avatar !== undefined && (
                  <Button
                    key={avatar.id}
                    onClick={() => handleAvatarChange(avatar)}
                    backgroundImage={avatar.fileUrl}
                    backgroundSize={'contain'}
                    width={100}
                    height={100}
                    variant={isToggled ? 'avatarSelected' : 'avatar'}
                  ></Button>
                )}
              </Box>
            );
          })}
        </SimpleGrid>
      </Box>
    </>
  );
};
