import { Box, Card, Image, SimpleGrid, Title, UnstyledButton } from '@mantine/core';
import { IImage } from 'models';
import { FC } from 'react';

interface AvatarGalleryProps {
  avatars: IImage[] | undefined;
  handleAvatarChange: (avatar: IImage) => void;
  classStyles: any;
}

export const AvatarGallery: FC<AvatarGalleryProps> = ({ avatars, handleAvatarChange, classStyles }) => {
  return (
    <>
      <Box>
        <Title order={3}>Select Your Avatar:</Title>
        <SimpleGrid mt={10} cols={4} breakpoints={[{ maxWidth: '56rem', cols: 1, spacing: 'sm' }]}>
          {avatars?.map((avatar, i) => (
            <Card withBorder radius="md" p="md" className={classStyles.card} key={i}>
              {avatar !== undefined && (
                <Card.Section>
                  <UnstyledButton key={avatar.id} onClick={() => handleAvatarChange(avatar)}>
                    <Image src={avatar.fileUrl} alt={avatar.fileName ?? ''} />
                  </UnstyledButton>
                </Card.Section>
              )}
            </Card>
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
};
