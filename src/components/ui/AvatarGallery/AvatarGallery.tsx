import { Box, Card, Image, SimpleGrid, Title, UnstyledButton } from '@mantine/core';
import { IImage } from 'models';
import { FC } from 'react';

interface AvatarGalleryProps {
  avatars: IImage[] | undefined;
  toggledAvatarId: string | undefined;
  handleAvatarChange: (avatar: IImage) => void;
  classStyles: any;
}

export const AvatarGallery: FC<AvatarGalleryProps> = ({
  avatars,
  toggledAvatarId,
  handleAvatarChange,
  classStyles,
}) => {
  return (
    <>
      <Box>
        <Title order={3}>Select Your Avatar:</Title>
        <SimpleGrid mt={10} cols={4} breakpoints={[{ maxWidth: '56rem', cols: 1, spacing: 'sm' }]}>
          {avatars?.map((avatar, i) => {
            const isToggled = avatar.id === toggledAvatarId;
            return (
              <Card
                withBorder={isToggled ? true : false}
                radius="md"
                p="md"
                className={classStyles.card}
                key={i}
                shadow={isToggled ? 'xl' : ''}
              >
                {avatar !== undefined && (
                  <Card.Section>
                    <UnstyledButton key={avatar.id} onClick={() => handleAvatarChange(avatar)}>
                      <Image src={avatar.fileUrl} alt={avatar.fileName ?? ''} />
                    </UnstyledButton>
                  </Card.Section>
                )}
              </Card>
            );
          })}
        </SimpleGrid>
      </Box>
    </>
  );
};
