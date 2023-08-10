import { Center, Spinner, Stack, Text } from '@chakra-ui/react';
import { FC } from 'react';

interface LoadingProps {
  message?: string;
}

export const Loading: FC<LoadingProps> = ({ message }) => {
  return (
    <Stack style={{ margin: 'auto' }}>
      <Spinner size="lg" style={{ margin: 'auto' }} />
      <Center>
        <Text w={500}>{message}</Text>
      </Center>
    </Stack>
  );
};
