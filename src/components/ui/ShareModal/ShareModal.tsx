import React from 'react'
import { useRouter } from 'next/router'
import { Button, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useClipboard } from '@chakra-ui/react';
import { TwitterIcon, TwitterShareButton, LinkedinIcon, LinkedinShareButton, TelegramShareButton, TelegramIcon, RedditShareButton, RedditIcon, EmailShareButton, EmailIcon } from "react-share";

const shareText = "I just completed the Sitecore Migration Advisor assessment and got my migration resources. Check it out!"

export default function ShareModal() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const router = useRouter()

  let shareUrl = ''
  if (typeof window !== 'undefined') {
    shareUrl = window.location.origin + router.asPath;
  }
  const { onCopy, value, setValue, hasCopied } = useClipboard(shareUrl);

  return (
    <div>
      <Button variant={'ghost'} onClick={onOpen}>Share</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Share Your Migration Advisor Results</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HStack mb={2} justifyContent={'center'}>
              <TwitterShareButton
                url={shareUrl}
                title={shareText}>
                <TwitterIcon size={32} round={true} />
              </TwitterShareButton>
              <LinkedinShareButton
                url={shareUrl}
                title={shareText}>
                <LinkedinIcon size={32} round={true} />
              </LinkedinShareButton>
              <TelegramShareButton
                url={shareUrl}
                title={shareText}>
                <TelegramIcon size={32} round={true} />
              </TelegramShareButton>
              <RedditShareButton
                url={shareUrl}
                title={shareText}>
                <RedditIcon size={32} round={true} />
              </RedditShareButton>
              <EmailShareButton
                url={shareUrl}
                title={shareText}>
                <EmailIcon size={32} round={true} />
              </EmailShareButton>
            </HStack>
            <HStack>
              <Input
                value={shareUrl}
                contentEditable={false}
                onChange={(e) => {
                  setValue(e.target.value);
                }}
                mr={2}
              />
              <Button variant={'ghost'} whiteSpace={'nowrap'} onClick={onCopy}>{hasCopied ? "Copied!" : "Copy"}</Button>
            </HStack>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
