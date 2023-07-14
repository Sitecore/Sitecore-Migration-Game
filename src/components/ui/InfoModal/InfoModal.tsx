import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Heading,
  Icon,
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
  useDisclosure,
} from '@chakra-ui/react';
import { FC } from 'react';
import { MdQuestionMark } from 'react-icons/md';

interface InfoModalProps {}

export const InfoModal: FC<InfoModalProps> = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>
        <Icon as={MdQuestionMark} fontSize={24} />
      </Button>
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
