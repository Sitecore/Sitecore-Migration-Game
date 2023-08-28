import {
  Button,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { FC, useEffect, useState } from 'react';
import { MdOutlineMarkChatRead } from 'react-icons/md';

interface FeedbackModalProps {}

export const FeedbackModal: FC<FeedbackModalProps> = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setTimeout(function () {
      setIsOpen(true);
    }, 5000);
  }, []);

  const onClose = () => setIsOpen(false);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(5px)" />
      <ModalContent>
        <ModalHeader>Feedback Request</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Thank you for trying our Migration adventure, we would greatly appreciate any feedback (positive or
            negative)!
          </Text>
        </ModalBody>

        <ModalFooter>
          <Tooltip label="Give Feedback" aria-label="Give Feedback">
            <Link href="https://forms.office.com/e/Mc6wczVqgh" isExternal>
              <Button
                rightIcon={<MdOutlineMarkChatRead size={24} />}
                colorScheme="primary"
                variant="solid"
                aria-label={'Give Feedback'}
              >
                Give Feedback
              </Button>
            </Link>
          </Tooltip>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
