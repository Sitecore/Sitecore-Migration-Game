import { Box, Button, Card, Group, Image, SimpleGrid, Title } from '@mantine/core';
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
        <SimpleGrid mt={10} cols={2} breakpoints={[{ maxWidth: '56rem', cols: 1, spacing: 'sm' }]}>
          {avatars?.map((avatar, i) => (
            <Card withBorder radius="md" p="md" className={classStyles.card} key={i}>
              {avatar !== undefined && (
                <Card.Section>
                  <Image src={avatar.fileUrl} alt={avatar.fileName ?? ''} />
                </Card.Section>
              )}
              <Group mt="xs">
                <Button radius="md" style={{ flex: 1 }} onClick={() => handleAvatarChange(avatar)}>
                  Select
                </Button>
              </Group>
            </Card>
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
};
