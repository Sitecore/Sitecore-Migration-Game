import { Card, Spinner, Text, VStack } from '@chakra-ui/react';
import { FC } from 'react';

interface LoadingProps {
  message?: string;
}

export const Loading: FC<LoadingProps> = ({ message }) => {
  return (
    <Card p="8" maxW="lg" opacity="0.75" align="center" variant="outline" my="20px" mx="auto">
      <VStack spacing="5">
        <Spinner size="xl" color="primary.500" thickness="4px" />
        <Text>{message}</Text>
      </VStack>
    </Card>
  );
};
