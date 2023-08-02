import { Box } from '@chakra-ui/react';
import { Card, Image, SimpleGrid, Title, UnstyledButton } from '@mantine/core';
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
      <Box mb="5px">
        <Title order={3}>Select Your Avatar:</Title>
        <SimpleGrid mt={10} cols={5} breakpoints={[
          { maxWidth: '56rem', cols: 5, spacing: 'sm' },
          { maxWidth: '48rem', cols: 3, spacing: 'sm' },
          { maxWidth: '36rem', cols: 2, spacing: 'sm' },]}>
          {avatars?.map((avatar, i) => {
            const isToggled = avatar.id === toggledAvatarId;
            return (
              <Card
                radius="md"
                p="md"
                className={isToggled ? classStyles.highlightCard : classStyles.card}
                key={i}
                shadow={isToggled ? 'xl' : ''}
              >
                {avatar !== undefined && (
                  <Card.Section>
                    <UnstyledButton key={avatar.id} onClick={() => handleAvatarChange(avatar)}>
                      <Image className={classStyles.avatarImage} src={avatar.fileUrl} alt={avatar.fileName ?? ''} />
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
