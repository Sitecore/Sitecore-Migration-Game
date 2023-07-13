import { Box, Center, Container } from '@chakra-ui/react';
import { PromptPanel } from 'components/Prompts';

const PromptPage = () => {
  return (
    <Box position="relative" h="calc(100vh - 64px)" w="full">
      <Center>
        <Container minW="container.lg">
          <PromptPanel />
        </Container>
      </Center>
    </Box>
  );
};

export default PromptPage;
