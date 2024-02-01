import { Box, Button, Card, Heading, Stack, Text, Tooltip } from '@chakra-ui/react';
import { useGameInfoContext } from 'components/Contexts';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { MdCached } from 'react-icons/md';

interface OutcomeUnavailableProps {}

export const OutcomeUnavailable: FC<OutcomeUnavailableProps> = (props) => {
  const router = useRouter();
  const gameInfoContext = useGameInfoContext();
  return (
    <Card w="60%" m="auto" mt={8} mb={4} p={8} justifyContent="center">
      <Stack>
        <Heading mb="2">Uh oh!</Heading>
        <Text>We were unable to create an outcome based on your answers, please start over and try again.</Text>
        <Box mt="4">
          <Tooltip label="Start Over" aria-label="Start Over">
            <Button
              onClick={() => router.push('/settings')}
              variant="solid"
              size={['md']}
              colorScheme="neutral"
              aria-label={'Start over'}
              leftIcon={<MdCached size={24} />}
            >
              Start Over
            </Button>
          </Tooltip>
        </Box>
      </Stack>
    </Card>
  );
};
