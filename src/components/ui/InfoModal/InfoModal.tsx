import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Heading,
  IconButton,
  Link,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  StackDivider,
  Text,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';
import { useGameInfoContext } from 'components/Contexts';
import { FC } from 'react';
import { MdQuestionMark } from 'react-icons/md';

interface InfoModalProps {}

export const InfoModal: FC<InfoModalProps> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const gameInfoContext = useGameInfoContext();

  return (
    <>
      <Tooltip label="About" aria-label="About the application">
        <IconButton
          onClick={onOpen}
          variant={gameInfoContext.theme?.chakraTheme == 'corporate' ? 'solid' : 'iconButton'}
          size={'lg'}
          button-type="icon"
          colorScheme="neutral"
          data-type="icon"
          aria-label={'About'}
          icon={<MdQuestionMark size={24} />}
        ></IconButton>
      </Tooltip>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>About this application</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack divider={<StackDivider />} spacing="4">
              <Box>
                <Text>This application is powered by Sitecore Content Hub ONE to store media and content.</Text>
              </Box>
              <Box>
                <Text>
                  The web experience is delivered using{' '}
                  <Link href="https://nextjs.org/" isExternal>
                    Next.js <ExternalLinkIcon mx="2px" />
                  </Link>{' '}
                  and{' '}
                  <Link href="https://chakra-ui.com/" isExternal>
                    Chakra UI <ExternalLinkIcon mx="2px" />
                  </Link>
                  .
                </Text>
              </Box>
              <Box>
                <Text>
                  Source code for the application can be found at:{' '}
                  <Link href="https://github.com/Sitecore/Sitecore-Migration-Game" isExternal>
                    github.com/Sitecore/Sitecore-Migration-Game <ExternalLinkIcon mx="2px" />
                  </Link>
                </Text>
              </Box>
              <Box>
                <Heading size="md">Credits</Heading>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Development
                </Heading>
                <List>
                  <ListItem>Dylan Young</ListItem>
                  <ListItem>Thomas Desmond</ListItem>
                  <ListItem>Jason St-Cyr</ListItem>
                  <ListItem>Mark van Aalst</ListItem>
                </List>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  UX Design
                </Heading>
                <List>
                  <ListItem>Mark van Aalst</ListItem>
                </List>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Story writing
                </Heading>
                <List>
                  <ListItem>Jason St-Cyr</ListItem>
                </List>
              </Box>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
