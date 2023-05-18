import { Loader, Stack, Text } from '@mantine/core';
import { FC } from 'react';

interface LoadingProps {
  message?: string;
}

export const Loading: FC<LoadingProps> = ({ message }) => {
  return (
    <Stack style={{ margin: 'auto' }}>
      <Loader size="lg" style={{ margin: 'auto' }} />
      <Text fz="md" fw={500}>
        {message}
      </Text>
    </Stack>
  );
};
