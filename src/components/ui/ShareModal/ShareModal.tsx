import React from 'react'
import { useRouter } from 'next/router'
import { Button, HStack, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure, useClipboard } from '@chakra-ui/react';
import { XIcon, TwitterShareButton, LinkedinIcon, LinkedinShareButton, EmailShareButton, EmailIcon, WhatsappShareButton, TelegramShareButton, RedditShareButton, WhatsappIcon, TelegramIcon, RedditIcon } from "react-share";
import { MdContentCopy } from "react-icons/md";

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
          <ModalBody mb={2}>
            <HStack mb={2} justifyContent={'center'}>
              <WhatsappShareButton
                url={shareUrl}
                title={shareText}>
                <WhatsappIcon size={32} round={true} />
              </WhatsappShareButton>
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
              <LinkedinShareButton
                url={shareUrl}
                title={shareText}>
              <LinkedinIcon size={32} round={true} />
            </LinkedinShareButton>
            <TwitterShareButton
              url={shareUrl}
              title={shareText}>
              <XIcon size={32} round={true} />
            </TwitterShareButton>
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
            <Button whiteSpace={'nowrap'} onClick={onCopy}><MdContentCopy /></Button>
          </HStack>
        </ModalBody>
      </ModalContent>
    </Modal>
    </div >
  )
}
